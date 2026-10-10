"""
Test script for mood analysis API
Demonstrates how to use the mood analysis endpoints
"""

import cv2 
import base64
import requests
import json
import time
from datetime import datetime

API_URL = 'http://127.0.0.1:5000'

def capture_frame_from_webcam():
    """Capture a single frame from webcam"""
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("❌ Error: Could not access webcam")
        return None
    
    print("📸 Capturing frame from webcam...")
    ret, frame = cap.read()
    cap.release()
    
    if not ret:
        print("❌ Error: Could not read frame")
        return None
    
    # Encode frame as base64
    _, buffer = cv2.imencode('.jpg', frame)
    frame_base64 = base64.b64encode(buffer).decode('utf-8')
    
    return f'data:image/jpeg;base64,{frame_base64}'

def test_single_frame_analysis():
    """Test analyzing a single frame"""
    print("\n" + "="*60)
    print("TEST 1: Single Frame Mood Analysis")
    print("="*60)
    
    frame_data = capture_frame_from_webcam()
    if not frame_data:
        return
    
    try:
        response = requests.post(
            f'{API_URL}/analyze-mood',
            json={
                'image': frame_data,
                'timestamp': datetime.now().isoformat()
            },
            headers={'Content-Type': 'application/json'}
        )
        
        result = response.json()
        
        if result.get('success'):
            print("\n✅ Analysis Successful!")
            print(f"\n🎭 Dominant Emotion: {result['dominant_emotion']}")
            print(f"📊 Engagement Score: {result['engagement_score']}/100")
            print(f"🎯 Engagement Status: {result['engagement_status']}")
            print(f"👤 Estimated Age: {result.get('age', 'N/A')}")
            print(f"⚧  Gender: {result.get('gender', 'N/A')}")
            
            print("\n📈 Emotion Breakdown:")
            emotions = result['emotions']
            for emotion, value in sorted(emotions.items(), key=lambda x: x[1], reverse=True):
                bar = '█' * int(value / 5)
                print(f"  {emotion:10s} {value:5.1f}% {bar}")
            
            print("\n💡 Recommendations:")
            for i, rec in enumerate(result['recommendations'], 1):
                print(f"  {i}. {rec}")
        else:
            print(f"\n❌ Analysis Failed: {result.get('error', 'Unknown error')}")
            
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        print("Make sure the Flask server is running on port 5000")

def test_batch_analysis(num_frames=5, interval=2):
    """Test analyzing multiple frames over time"""
    print("\n" + "="*60)
    print(f"TEST 2: Batch Analysis ({num_frames} frames)")
    print("="*60)
    
    frames = []
    
    print(f"\n📸 Capturing {num_frames} frames (one every {interval} seconds)...")
    
    for i in range(num_frames):
        print(f"  Capturing frame {i+1}/{num_frames}...")
        frame_data = capture_frame_from_webcam()
        
        if frame_data:
            frames.append({
                'image': frame_data,
                'timestamp': i * interval
            })
            
        if i < num_frames - 1:
            time.sleep(interval)
    
    if not frames:
        print("❌ No frames captured")
        return
    
    try:
        print(f"\n🔄 Sending {len(frames)} frames for analysis...")
        response = requests.post(
            f'{API_URL}/batch-analyze-mood',
            json={'frames': frames},
            headers={'Content-Type': 'application/json'}
        )
        
        result = response.json()
        
        if result.get('success'):
            print("\n✅ Batch Analysis Successful!")
            print(f"\n📊 Summary:")
            print(f"  Total Frames Analyzed: {result['total_frames_analyzed']}")
            print(f"  Average Engagement Score: {result['average_engagement_score']:.2f}/100")
            print(f"  Most Common Emotion: {result['most_common_emotion']}")
            
            print("\n📈 Emotion Distribution:")
            for emotion, count in result['emotion_distribution'].items():
                percentage = (count / result['total_frames_analyzed']) * 100
                print(f"  {emotion:10s}: {count} times ({percentage:.1f}%)")
            
            print("\n⏱️  Engagement Timeline:")
            for entry in result['engagement_timeline']:
                timestamp = entry['timestamp']
                score = entry['score']
                status = entry['status']
                emotion = entry['emotion']
                
                status_emoji = {
                    'highly_engaged': '🟢',
                    'engaged': '🟢',
                    'neutral': '🟡',
                    'partially_engaged': '🟠',
                    'confused': '🟠',
                    'distracted': '🔴',
                    'frustrated': '🔴',
                    'bored': '🔴'
                }.get(status, '⚪')
                
                print(f"  {status_emoji} T+{timestamp}s: {emotion:10s} | Score: {score:5.1f} | Status: {status}")
        else:
            print(f"\n❌ Batch Analysis Failed: {result.get('error', 'Unknown error')}")
            
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        print("Make sure the Flask server is running on port 5000")

def test_server_health():
    """Check if server is running"""
    print("\n" + "="*60)
    print("Checking Server Status")
    print("="*60)
    
    try:
        response = requests.get(f'{API_URL}/health', timeout=5)
        result = response.json()
        
        if result.get('status') == 'healthy':
            print(f"✅ Server is running: {result.get('message')}")
            return True
        else:
            print("⚠️  Server responded but status is not healthy")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Make sure Flask is running on port 5000")
        print("\nTo start the server, run:")
        print("  cd c:\\sparkless\\video_proctoring_project\\proctoring")
        print("  python app.py")
        return False
    except Exception as e:
        print(f"❌ Error checking server: {str(e)}")
        return False

def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("🎓 Learner Mood Analysis - Test Suite")
    print("="*60)
    
    # Check server status first
    if not test_server_health():
        return
    
    # Wait a moment
    time.sleep(1)
    
    # Test single frame analysis
    test_single_frame_analysis()
    
    # Wait before batch test
    print("\n⏳ Waiting 3 seconds before batch test...")
    time.sleep(3)
    
    # Test batch analysis
    test_batch_analysis(num_frames=3, interval=2)
    
    print("\n" + "="*60)
    print("✅ All Tests Complete!")
    print("="*60)
    print("\nFor more information, see MOOD_ANALYSIS_README.md")

if __name__ == "__main__":
    main()
