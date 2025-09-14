import os
import cv2
import numpy as np
from skimage.feature import hog
from sklearn.decomposition import PCA
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import LinearSVC
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import classification_report, accuracy_score
import kagglehub
import joblib 

path=kagglehub.dataset_download("aarishasifkhan/plantvillage-potato-disease-dataset")
print("Path to dataset files:", path)

dataset_path=os.path.join(path, "PlantVillage")
categories=["Healthy", "Early_blight", "Late_blight"]


def compute_features(img):
    img=cv2.resize(img, (96, 96))
    gray=cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


    hog_feat=hog(
        gray,
        orientations=9,
        pixels_per_cell=(8, 8),
        cells_per_block=(2, 2),
        block_norm='L2-Hys',
        visualize=False
    )

    
    hsv=cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    hist=cv2.calcHist([hsv], [0, 1, 2], None, [8, 8, 8],
                        [0, 180, 0, 256, 0, 256]).flatten()
    hist=hist/np.sum(hist)

    return np.hstack([hog_feat, hist])


def augment_image(img):
    augmented=[img]
    rows, cols=img.shape[:2]

    
    augmented.append(cv2.flip(img, 1))
    augmented.append(cv2.flip(img, 0))

 
    for angle in [-15, 15]:
        M=cv2.getRotationMatrix2D((cols /2, rows /2), angle, 1)
        augmented.append(cv2.warpAffine(img, M, (cols, rows)))

    for factor in [0.8, 1.2]:
        img_bright=cv2.convertScaleAbs(img, alpha=factor, beta=0)
        augmented.append(img_bright)

    return augmented


def load_images(folder, label, augment=True, limit=None):
    data, labels= [], []
    files=os.listdir(folder)
    if limit:
        files=files[:limit]

    for file in files:
        path_img=os.path.join(folder, file)
        img=cv2.imread(path_img)
        if img is None:
            continue

        imgs_to_use=augment_image(img) if augment else [img]
        for im in imgs_to_use:
            feat=compute_features(im)
            data.append(feat)
            labels.append(label)

    return data, labels


x, y =[], []
for i, cat in enumerate(categories):
    folder=os.path.join(dataset_path, cat)
    d, l=load_images(folder, i, augment=True)
    x.extend(d)
    y.extend(l)

x= np.array(x)
y=np.array(y)
print("Feature matrix shape:", x.shape)


model=Pipeline([
    ("scaler", StandardScaler()),
    ("pca", PCA(n_components=500)),
    ("clf", LinearSVC(max_iter=100000, class_weight="balanced", C=1.0))
])


print("Running detailed 5-fold cross-validation...\n")
skf=StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

fold=1
for train_idx, test_idx in skf.split(x, y):
    xtrain, xtest=x[train_idx], x[test_idx]
    ytrain, ytest=y[train_idx], y[test_idx]

    print(f"Training Fold {fold}...")
    model.fit(xtrain, ytrain)
    yp=model.predict(xtest)

    acc=accuracy_score(ytest, yp)
    print(f"Fold {fold} — Accuracy: {acc:.4f}")
    print(classification_report(ytest, yp, target_names=categories))
    fold+=1

joblib.dump(model, "potatodisease_model.pkl")