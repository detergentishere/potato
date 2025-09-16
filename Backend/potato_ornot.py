from fastapi import APIRouter, UploadFile, File
import joblib, cv2, numpy as np
from skimage.feature import hog

router = APIRouter()

# Load potato-or-not model
potato_model = joblib.load("potatoornot_model.pkl")

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

@router.post("/predict/potato/")
async def predict_potato(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        return {"error": "Invalid image"}
    features = compute_features(img).reshape(1, -1)
    pred = potato_model.predict(features)[0]
    return {"result": "Potato 🥔" if pred == 0 else "Not a Potato ❌"}
