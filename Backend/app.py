from fastapi import APIRouter, UploadFile, File
import cv2, numpy as np
from skimage.feature import hog
import joblib

router=APIRouter()
disease_model = joblib.load("potatodisease_model.pkl")
categories = ["Healthy", "Early_blight", "Late_blight"]

def compute_features(img):
    img = cv2.resize(img, (96, 96))
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    hog_feat = hog(gray,
                   orientations=9,
                   pixels_per_cell=(8, 8),
                   cells_per_block=(2, 2),
                   block_norm='L2-Hys',
                   visualize=False)

    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    hist = cv2.calcHist([hsv], [0,1,2], None,
                        [8,8,8], [0,180,0,256,0,256]).flatten()
    hist = hist / np.sum(hist)

    return np.hstack([hog_feat, hist])

@router.post("/predict/disease/")
async def predict_disease(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        return {"error": "Invalid image"}
    features = compute_features(img).reshape(1, -1)
    pred_idx = disease_model.predict(features)[0]
    return {"result": categories[pred_idx]}
