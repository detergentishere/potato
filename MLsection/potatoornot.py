import os
import cv2
import numpy as np
from skimage.feature import hog
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.svm import LinearSVC
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import classification_report, accuracy_score
import joblib
import random
import warnings

warnings.filterwarnings("ignore", category=UserWarning, module="cv2")

# ----------------------------
# Paths
# ----------------------------
potato_only_train = r"C:\Users\isha\Desktop\potato\MLsection\wha\data\train"
potato_only_test  = r"C:\Users\isha\Desktop\potato\MLsection\wha\data\test"

kaggle_train = r"C:\Users\isha\.cache\kagglehub\datasets\kritikseth\fruit-and-vegetable-image-recognition\versions\8\train"
kaggle_test  = r"C:\Users\isha\.cache\kagglehub\datasets\kritikseth\fruit-and-vegetable-image-recognition\versions\8\test"

# Categories
categories = ["Potato", "NotPotato"]

# ----------------------------
# Feature extraction
# ----------------------------
def compute_features(img):
    img = cv2.resize(img, (96, 96))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # HOG features
    hog_feat = hog(gray,
                   orientations=9,
                   pixels_per_cell=(8, 8),
                   cells_per_block=(2, 2),
                   block_norm='L2-Hys',
                   visualize=False)

    # HSV histogram
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    hist = cv2.calcHist([hsv], [0,1,2], None, [8,8,8], [0,180,0,256,0,256]).flatten()
    hist = hist / np.sum(hist)
    
    return np.hstack([hog_feat, hist])

# ----------------------------
# Load images from folder
# ----------------------------
def load_images(folder, label):
    data, labels = [], []
    valid_exts = (".jpg", ".jpeg", ".png", ".bmp")
    for root, _, files in os.walk(folder):
        for file in files:
            if file.lower().endswith(valid_exts):
                path_img = os.path.join(root, file)
                img = cv2.imread(path_img)
                if img is None:
                    continue
                feat = compute_features(img)
                data.append(feat)
                labels.append(label)
    return data, labels

# ----------------------------
# Load potato-only dataset (all label=0)
# ----------------------------
x_potato_train, y_potato_train = load_images(potato_only_train, 0)
x_potato_test, y_potato_test   = load_images(potato_only_test, 0)

print(f"Potato-only training: {len(x_potato_train)} images")
print(f"Potato-only test: {len(x_potato_test)} images")

# ----------------------------
# Load Kaggle dataset (Potato=0, NotPotato=1)
# ----------------------------
def load_kaggle_nonpotato(folder):
    x, y = [], []
    for sub in os.listdir(folder):
        path_sub = os.path.join(folder, sub)
        if not os.path.isdir(path_sub):
            continue
        label = 0 if "potato" in sub.lower() else 1
        dx, dy = load_images(path_sub, label)
        x.extend(dx)
        y.extend(dy)
    return x, y

x_kaggle_train, y_kaggle_train = load_kaggle_nonpotato(kaggle_train)
x_kaggle_test,  y_kaggle_test  = load_kaggle_nonpotato(kaggle_test)

print(f"Kaggle training images: {len(x_kaggle_train)}")
print(f"Kaggle test images: {len(x_kaggle_test)}")

# ----------------------------
# Model pipeline
# ----------------------------
def build_model():
    return Pipeline([
        ("scaler", StandardScaler()),
        ("pca", PCA(n_components=200)),
        ("clf", LinearSVC(max_iter=50000, class_weight="balanced", C=1.0))
    ])

# ----------------------------
# Incremental learning experiment
# ----------------------------
ratios = [0.0, 0.2, 0.5, 1.0]  # percent of non-potatoes added
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

for r in ratios:
    n_non = int(len([l for l in y_kaggle_train if l==1]) * r)
    nonpotato_subset = random.sample([(xk, yk) for xk, yk in zip(x_kaggle_train, y_kaggle_train) if yk==1], n_non)
    
    x_curr = np.array(x_potato_train + [xk for xk,_ in nonpotato_subset])
    y_curr = np.array(y_potato_train + [yk for _,yk in nonpotato_subset])
    
    if len(np.unique(y_curr)) < 2:
        print(f"\nRatio {r:.1f}: Only potatoes, skipping SVM training.")
        continue
    
    model = build_model()
    accs = []
    print(f"\n🔹 Ratio {r:.1f} non-potatoes → cross-validation:")
    for train_idx, val_idx in skf.split(x_curr, y_curr):
        xtr, xval = x_curr[train_idx], x_curr[val_idx]
        ytr, yval = y_curr[train_idx], y_curr[val_idx]
        model.fit(xtr, ytr)
        yp = model.predict(xval)
        accs.append(accuracy_score(yval, yp))
    print(f"CV Accuracy: {np.mean(accs):.4f}")

# ----------------------------
# Final training on full train set
# ----------------------------
x_final = np.array(x_potato_train + [xk for xk,yk in zip(x_kaggle_train, y_kaggle_train) if yk==1])
y_final = np.array(y_potato_train + [yk for yk in y_kaggle_train if yk==1])
model = build_model()
model.fit(x_final, y_final)
joblib.dump(model, "potatoornot_model.pkl")
print("\n✅ Final model saved as potatoornot_model.pkl")

# ----------------------------
# Final evaluation on test set
# ----------------------------
x_test_final = np.array(x_potato_test + [xk for xk,yk in zip(x_kaggle_test, y_kaggle_test) if yk==1] )
y_test_final = np.array(y_potato_test + [yk for yk in y_kaggle_test if yk==1])

ypred = model.predict(x_test_final)
print("\n🎯 Test Accuracy:", accuracy_score(y_test_final, ypred))
print(classification_report(y_test_final, ypred, target_names=categories))
