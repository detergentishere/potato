import os
import cv2
import numpy as np
from skimage.feature import hog
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import classification_report
import joblib
import random
import warnings

warnings.filterwarnings("ignore", category=UserWarning, module="cv2")

# ----------------------------
# Paths
# ----------------------------
base_path = r"C:\Users\isha\.cache\kagglehub\datasets\kritikseth\fruit-and-vegetable-image-recognition"
version_folder = os.listdir(os.path.join(base_path, "versions"))[0]
train_path = os.path.join(base_path, "versions", version_folder, "train")

print("🥔 Potato Core activated. Crops detected:", os.listdir(train_path))

# ----------------------------
# HOG feature function
# ----------------------------
def compute_hog(img):
    return hog(
        img,
        orientations=9,
        pixels_per_cell=(8, 8),
        cells_per_block=(2, 2),
        block_norm='L2-Hys',
        visualize=False,
        channel_axis=-1
    )

# ----------------------------
# Data augmentation for potatoes
# ----------------------------
def augment_image(img):
    augmented = [img]
    rows, cols = img.shape[:2]
    
    # Horizontal flip
    augmented.append(cv2.flip(img, 1))
    
    # Small rotations
    for angle in [-15, 15]:
        M = cv2.getRotationMatrix2D((cols/2, rows/2), angle, 1)
        augmented.append(cv2.warpAffine(img, M, (cols, rows)))
    
    # Brightness adjustment
    for factor in [0.8, 1.2]:
        img_bright = cv2.convertScaleAbs(img, alpha=factor, beta=0)
        augmented.append(img_bright)
    
    return augmented

# ----------------------------
# Load images and compute HOG
# ----------------------------
def load_images_hog(folder, label, augment=False):
    data, labels = [], []
    for file in os.listdir(folder):
        path_img = os.path.join(folder, file)
        img = cv2.imread(path_img)
        if img is None: 
            continue
        img = cv2.resize(img, (64, 64))
        
        imgs_to_use = augment_image(img) if augment else [img]
        for im in imgs_to_use:
            data.append(compute_hog(im))
            labels.append(label)
    return data, labels

# ----------------------------
# Potato path
# ----------------------------
potato_path = os.path.join(train_path, "Potato")
potato_data, potato_labels = load_images_hog(potato_path, 1, augment=True)

# ----------------------------
# Prepare a tiny dummy "not potato" set for first training
# ----------------------------
other_paths = [os.path.join(train_path, cls) for cls in os.listdir(train_path) if cls != "Potato"]
dummy_path = other_paths[0]
dummy_data, dummy_labels = load_images_hog(dummy_path, 0, augment=False)

X = np.array(potato_data + dummy_data)
y = np.array(potato_labels + dummy_labels)

xtrain, xtest, ytrain, ytest = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# ----------------------------
# Train first model
# ----------------------------
model = SVC(kernel='linear', class_weight='balanced', probability=True)
model.fit(xtrain, ytrain)

print("🥔 First Potato-Only Training Complete 🥔")
yp = model.predict(xtest)
print(classification_report(ytest, yp))

# ----------------------------
# Incrementally add remaining crops
# ----------------------------
remaining_paths = [p for p in other_paths if p != dummy_path]
batch_size = 3  # number of crops per batch

for i in range(0, len(remaining_paths), batch_size):
    batch = remaining_paths[i:i+batch_size]
    batch_data, batch_labels = [], []
    for folder in batch:
        d, l = load_images_hog(folder, 0, augment=False)
        batch_data.extend(d)
        batch_labels.extend(l)
    
    # Merge with existing dataset
    X = np.vstack([X, np.array(batch_data)])
    y = np.hstack([y, np.array(batch_labels)])
    
    # Shuffle dataset
    idx = np.arange(len(X))
    np.random.shuffle(idx)
    X, y = X[idx], y[idx]
    
    # Split and retrain
    xtrain, xtest, ytrain, ytest = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    model.fit(xtrain, ytrain)
    
    print(f"🥔 Incremental Training Complete: Added crops {i+1} to {i+len(batch)} 🥔")
    yp = model.predict(xtest)
    print(classification_report(ytest, yp))

# ----------------------------
# Save final model
# ----------------------------
joblib.dump(model, "potato_core.pkl")
print("✅ Potato Core brain saved as potato_core.pkl ✅")
