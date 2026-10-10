# 🎯 Mood Analysis System Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         LEARNER INTERFACE                            │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│  │   Webcam     │───▶│ Capture Frame│───▶│  Base64      │         │
│  │   Video      │    │   (Canvas)   │    │  Encoding    │         │ 
│  └──────────────┘    └──────────────┘    └──────┬───────┘         │
└────────────────────────────────────────────────────┼────────────────┘
                                                     │
                                                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        FLASK API SERVER                              │
│                      (app.py - Port 5000)                           │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │              POST /analyze-mood                             │   │
│  │              POST /batch-analyze-mood                       │   │
│  └────────────────────────┬───────────────────────────────────┘   │
│                            ▼                                         │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │         analyze_learner_mood(frame_data)                     │  │
│  │                                                               │  │
│  │  1. Decode base64 image                                      │  │
│  │  2. Convert to OpenCV format                                 │  │
│  │  3. Call DeepFace.analyze()                                  │  │
│  │  4. Calculate engagement score                               │  │
│  │  5. Determine engagement status                              │  │
│  │  6. Generate recommendations                                 │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
└────────────────────────────┼────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        DEEPFACE AI ENGINE                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    DeepFace.analyze()                         │  │
│  │                                                                │  │
│  │  Face Detection ────▶ OpenCV Haar Cascade                    │  │
│  │        │                                                       │  │
│  │        ▼                                                       │  │
│  │  Emotion Analysis ──▶ CNN Model (VGGFace/FaceNet)           │  │
│  │        │                                                       │  │
│  │        ▼                                                       │  │
│  │  Age Estimation ───▶ Regression Model                        │  │
│  │        │                                                       │  │
│  │        ▼                                                       │  │
│  │  Gender Detection ─▶ Classification Model                    │  │
│  └────────────────────────┬─────────────────────────────────────┘  │
└────────────────────────────┼────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    EMOTION CLASSIFICATION                            │
│                                                                      │
│  Input: Face Image (RGB/BGR)                                        │
│                                                                      │
│  Output: {                                                          │
│    "angry": 0.5%,                                                   │
│    "disgust": 0.2%,                                                 │
│    "fear": 0.8%,                                                    │
│    "happy": 85.3%,     ◄─── Dominant Emotion                       │
│    "sad": 1.2%,                                                     │
│    "surprise": 5.0%,                                                │
│    "neutral": 7.0%                                                  │
│  }                                                                  │
└────────────────────────────┬────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  ENGAGEMENT SCORE CALCULATION                        │
│                                                                      │
│  Engaged Emotions:    happy + surprise + neutral                    │
│  Disengaged Emotions: sad + angry + fear + disgust                  │
│                                                                      │
│  Formula:                                                           │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │ Engagement Score = Max(0, Min(100,                          │   │
│  │   (happy + surprise + neutral * 0.7) -                      │   │
│  │   (sad + angry + fear + disgust)                            │   │
│  │ ))                                                           │   │
│  └────────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  ENGAGEMENT STATUS MAPPING                           │
│                                                                      │
│  Score Range │ Emotion      │ Status                                │
│  ────────────┼──────────────┼───────────────────                   │
│  70-100      │ happy/surprise│ highly_engaged   🟢                  │
│  70-100      │ other        │ engaged          🟢                  │
│  40-69       │ neutral      │ neutral          🟡                  │
│  40-69       │ other        │ partially_engaged🟠                  │
│  20-39       │ sad/fear     │ confused         🟠                  │
│  20-39       │ other        │ distracted       🔴                  │
│  0-19        │ sad/angry    │ frustrated       🔴                  │
│  0-19        │ other        │ bored            🔴                  │
└────────────────────────────┬────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                 RECOMMENDATION GENERATION                            │
│                                                                      │
│  Based on engagement status, select appropriate recommendations:    │
│                                                                      │
│  🟢 Highly Engaged:    "Excellent focus! Keep up the great work!"  │
│  🟢 Engaged:           "Good focus! You're learning well."          │
│  🟡 Neutral:           "Try to stay more engaged with content."     │
│  🟠 Partially Engaged: "Your attention seems drifting. Refocus."    │
│  🟠 Confused:          "Try rewatching this section."               │
│  🔴 Distracted:        "Remove distractions and refocus."           │
│  🔴 Frustrated:        "Take a short break if feeling frustrated."  │
│  🔴 Bored:             "Try changing your study environment."       │
└────────────────────────────┬────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         JSON RESPONSE                                │
│                                                                      │
│  {                                                                   │
│    "success": true,                                                 │
│    "dominant_emotion": "happy",                                     │
│    "emotions": { ... },                                             │
│    "engagement_score": 82.5,                                        │
│    "engagement_status": "highly_engaged",                           │
│    "recommendations": [ ... ],                                      │
│    "age": 24,                                                       │
│    "gender": "Man",                                                 │
│    "timestamp": "2025-12-20T10:30:00Z"                              │
│  }                                                                   │
└────────────────────────────┬────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       CLIENT APPLICATION                             │
│                                                                      │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐       │
│  │  Display       │  │  Log to        │  │  Send Alerts   │       │
│  │  Results       │  │  Database      │  │  if Needed     │       │
│  └────────────────┘  └────────────────┘  └────────────────┘       │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow Example

### Input
```javascript
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "timestamp": "2025-12-20T10:30:00Z"
}
```

### Processing Steps
1. **Image Decoding**: Base64 → PIL Image → NumPy Array → OpenCV BGR
2. **Face Detection**: OpenCV Haar Cascade finds face coordinates
3. **Face Extraction**: Crop face region from frame
4. **Emotion Analysis**: DeepFace CNN model predicts 7 emotions
5. **Score Calculation**: Apply engagement formula
6. **Status Determination**: Map score + emotion → status
7. **Recommendation Selection**: Choose messages based on status

### Output
```json
{
  "success": true,
  "dominant_emotion": "happy",
  "emotions": {
    "angry": 0.5, "disgust": 0.2, "fear": 0.8,
    "happy": 85.3, "sad": 1.2, "surprise": 5.0, "neutral": 7.0
  },
  "engagement_score": 82.5,
  "engagement_status": "highly_engaged",
  "recommendations": [
    "Excellent focus! Keep up the great work!",
    "You're doing fantastic! Stay on track."
  ],
  "age": 24,
  "gender": "Man",
  "timestamp": "2025-12-20T10:30:00Z"
}
```

## Component Responsibilities

### 1. Frontend (test_mood_analysis.html)
- Capture webcam frames
- Convert to base64
- Send HTTP POST requests
- Display results with UI

### 2. Flask API (app.py)
- Handle HTTP requests/responses
- Image preprocessing
- Coordinate AI analysis
- Generate recommendations
- Return JSON responses

### 3. DeepFace Library
- Face detection (OpenCV backend)
- Emotion classification (CNN models)
- Age estimation (regression)
- Gender detection (classification)

### 4. Helper Functions
- `analyze_learner_mood()`: Main orchestrator
- `calculate_engagement_score()`: Score computation
- `determine_engagement_status()`: Status mapping
- `generate_engagement_recommendations()`: Message selection

## Performance Characteristics

### Single Frame Analysis
- **Input**: 640x480 JPEG image (~50-100KB base64)
- **Processing Time**: 1-2 seconds (CPU), 0.3-0.5s (GPU)
- **Memory Usage**: ~500MB (model loaded)
- **Output**: ~1KB JSON

### Batch Analysis
- **Input**: Array of N frames
- **Processing Time**: ~N seconds (sequential processing)
- **Optimization**: Consider parallel processing for production
- **Output**: Summary + detailed results

## Error Handling Flow

```
Input Validation
    ├─ No image? → 400 Bad Request
    ├─ Invalid base64? → 500 with error message
    └─ Valid image
          ↓
Face Detection
    ├─ No face found? → Success=false, message shown
    ├─ Face too small? → Success=false, message shown
    └─ Face detected
          ↓
Emotion Analysis
    ├─ DeepFace error? → Success=false, error logged
    ├─ Model not loaded? → Success=false, retry
    └─ Analysis successful
          ↓
Return Results
    └─ Success=true, full analysis returned
```

## Integration Points

### With Django Proctoring System
```python
# In monitor/views.py
from app import analyze_learner_mood

def proctoring_session(request):
    frame = capture_frame()
    mood = analyze_learner_mood(frame)
    
    # Store in database
    EngagementLog.objects.create(
        session=session,
        score=mood['engagement_score'],
        status=mood['engagement_status'],
        emotion=mood['dominant_emotion']
    )
```

## Scalability Considerations

### Current Design (Development)
- Synchronous processing
- Single server instance
- In-memory model loading

### Production Recommendations
- Use message queue (Celery/RabbitMQ)
- Implement worker pools
- Add Redis caching
- Use load balancer
- Consider GPU instances

---

**This diagram shows the complete flow from webcam capture to actionable insights!**
