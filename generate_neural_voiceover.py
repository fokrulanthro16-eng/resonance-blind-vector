"""
=============================================================================
RESONANCE: Blind Vector — Studio Master Neural Voiceover Generator
Engineered for Wolfjaw Studios Competition Standards
Voice: Microsoft en-US-ChristopherNeural (Rate: -4%, Pitch: -2Hz)
FFmpeg Mastering: High-pass (80Hz) + High-shelf (+3dB @ 8kHz) + 
                  Compressor (threshold=-18dB, ratio=4) + 
                  EBU R128 Loudness Normalization (-14 LUFS, TP -1.5)
=============================================================================
"""

import asyncio
import os
import subprocess
import edge_tts

VOICE = "en-US-ChristopherNeural"
RATE = "-4%"
PITCH = "-2Hz"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_PARTS_DIR = os.path.join(SCRIPT_DIR, "neural_parts")
os.makedirs(RAW_PARTS_DIR, exist_ok=True)

FINAL_VOICEOVER_MP3 = os.path.join(SCRIPT_DIR, "voiceover.mp3")
FINAL_VOICEOVER_WAV = os.path.join(SCRIPT_DIR, "voiceover.wav")

CUES = [
    {
        "index": 0,
        "time_ms": 1500,
        "text": "Resonance: Blind Vector. A revolutionary sensory inversion protocol engineered for Wolfjaw Studios. Visible reality exists exclusively through acoustic perturbation."
    },
    {
        "index": 1,
        "time_ms": 18000,
        "text": "Active sonar pulses cast three hundred sixty analytical rays. Propagating at simulated sound velocity, physical reflections excite five thousand long-persistence phosphor particles in absolute darkness."
    },
    {
        "index": 2,
        "time_ms": 36000,
        "text": "Infiltrating Sector Alpha. Locating Anchor Alpha vibrating at four hundred thirty-two Hertz Solfeggio. Holding interaction engages heterodyne phase-locking, tuning the beat frequency into resonant phase alignment."
    },
    {
        "index": 3,
        "time_ms": 58000,
        "text": "Acoustic threat alert: The Apex Lurker has breached sensory shielding. Instantaneous Doppler shift modulations calculate a violent closing vector. Launching tactical acoustic decoy to divert the predator into an adjacent corridor."
    },
    {
        "index": 4,
        "time_ms": 80000,
        "text": "Predator diverted. Activating real-world microphone echolocation. Physical hand claps and vocal commands directly perturb the digital labyrinth without keyboard input."
    },
    {
        "index": 5,
        "time_ms": 102000,
        "text": "All extraction frequencies resolved. The central extraction beacon is online. Navigating to the acoustic nexus for final phase extraction. Mission accomplished."
    }
]

async def generate_speech_parts():
    print(f">>> [1/3] SYNTHESIZING {len(CUES)} NEURAL VOCAL SEGMENTS VIA EDGE-TTS ({VOICE})...")
    for cue in CUES:
        idx = cue["index"]
        text = cue["text"]
        part_path = os.path.join(RAW_PARTS_DIR, f"neural_{idx}.mp3")
        print(f"    - Part {idx} @ {cue['time_ms']/1000.0:.1f}s: \"{text[:45]}...\"")
        comm = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
        await comm.save(part_path)
    print(">>> ALL NEURAL SPEECH PARTS GENERATED SUCCESSFULLY.")

def assemble_and_master():
    print(">>> [2/3] ASSEMBLING TIMED TIMELINE & APPLYING STUDIO AUDIO MASTERING...")
    
    # Construct FFmpeg input args
    input_args = []
    adelay_filters = []
    mix_inputs = []
    
    for idx, cue in enumerate(CUES):
        part_path = os.path.join(RAW_PARTS_DIR, f"neural_{idx}.mp3")
        input_args.extend(["-i", part_path])
        delay = cue["time_ms"]
        # adelay takes delay_left|delay_right in ms
        adelay_filters.append(f"[{idx}:a]adelay={delay}|{delay}[a{idx}]")
        mix_inputs.append(f"[a{idx}]")
    
    delays_str = ";".join(adelay_filters)
    mix_inputs_str = "".join(mix_inputs)
    amix_str = f"{mix_inputs_str}amix=inputs={len(CUES)}:dropout_transition=0[mixed]"
    
    # Broadcast-grade studio mastering filter graph:
    # 1. High-pass filter at 80Hz (cuts low-frequency mic rumble/sub-thump)
    # 2. High-shelf boost (+3dB at 8kHz for vocal clarity, presence and air)
    # 3. Dynamic compressor (threshold=-18dB [0.125 lin], ratio=4:1, attack=20ms, release=250ms)
    # 4. EBU R128 Loudness Normalization (Integrated -14 LUFS, LRA 7, True Peak -1.5 dBFS)
    master_eq = (
        "highpass=f=80,"
        "highshelf=f=8000:gain=3,"
        "acompressor=threshold=0.125:ratio=4:attack=20:release=250,"
        "loudnorm=I=-14:LRA=7:TP=-1.5"
    )
    
    filter_complex = f"{delays_str};{amix_str};[mixed]{master_eq}[master_voice]"
    
    # Generate mastered MP3
    cmd_mp3 = [
        "ffmpeg", "-y",
        *input_args,
        "-filter_complex", filter_complex,
        "-map", "[master_voice]",
        "-c:a", "libmp3lame", "-b:a", "320k",
        "-t", "120",
        FINAL_VOICEOVER_MP3
    ]
    
    print(f"Executing FFmpeg Studio Master (MP3):\n{' '.join(cmd_mp3)}")
    subprocess.run(cmd_mp3, check=True)
    
    # Also generate mastered uncompressed WAV for lossless muxing
    cmd_wav = [
        "ffmpeg", "-y",
        "-i", FINAL_VOICEOVER_MP3,
        "-c:a", "pcm_s16le", "-ar", "48000",
        FINAL_VOICEOVER_WAV
    ]
    print(f"Exporting broadcast master WAV:\n{' '.join(cmd_wav)}")
    subprocess.run(cmd_wav, check=True)
    
    print("\n==============================================================================")
    print(f">>> STUDIO MASTER NEURAL VOICEOVER GENERATED:")
    print(f">>> MP3: {FINAL_VOICEOVER_MP3} ({os.path.getsize(FINAL_VOICEOVER_MP3)} bytes)")
    print(f">>> WAV: {FINAL_VOICEOVER_WAV} ({os.path.getsize(FINAL_VOICEOVER_WAV)} bytes)")
    print("==============================================================================\n")

async def main():
    await generate_speech_parts()
    assemble_and_master()

if __name__ == "__main__":
    asyncio.run(main())
