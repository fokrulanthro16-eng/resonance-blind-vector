/**
 * ==============================================================================
 * RESONANCE: Blind Vector — Production Trailer Generator
 * Automated 120-Second Headless Gameplay Director & Audio-Visual Muxer
 * ==============================================================================
 */

const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = __dirname;
const RAW_VIDEO_DIR = path.join(PROJECT_DIR, 'raw_video');
const OUTPUT_MP4 = path.join(PROJECT_DIR, 'resonance-demo.mp4');
const VOICEOVER_WAV = path.join(PROJECT_DIR, 'voiceover.wav');
const GAME_AUDIO_WEBM = path.join(PROJECT_DIR, 'game_audio.webm');

// Ensure clean video recording directory
if (fs.existsSync(RAW_VIDEO_DIR)) {
  fs.rmSync(RAW_VIDEO_DIR, { recursive: true, force: true });
}
fs.mkdirSync(RAW_VIDEO_DIR, { recursive: true });

async function run() {
  console.log('>>> [0/4] VERIFYING STUDIO MASTER NEURAL VOICEOVER TRACK (EDGE-TTS)...');
  const voiceoverMp3 = path.join(PROJECT_DIR, 'voiceover.mp3');
  if (!fs.existsSync(VOICEOVER_WAV) || !fs.existsSync(voiceoverMp3)) {
    console.log('>>> GENERATING STUDIO NEURAL VOICEOVER VIA edge-tts...');
    execSync('python generate_neural_voiceover.py', { cwd: PROJECT_DIR, stdio: 'inherit' });
  }

  console.log('>>> [1/4] INITIALIZING HEADLESS CHROMIUM SIMULATOR (1080p 60FPS)...');

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: [
      '--window-size=1920,1080',
      '--autoplay-policy=no-user-gesture-required',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: RAW_VIDEO_DIR,
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();
  console.log('>>> [2/4] LOADING RESONANCE ENGINE AT http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // 1. Engage Acoustic Sensory Link
  console.log('>>> ENGAGING ACOUSTIC SENSORY LINK (AUDIO CONTEXT INITIALIZATION)...');
  await page.waitForSelector('#btnLaunch', { timeout: 10000 });
  await page.click('#btnLaunch');
  await page.waitForTimeout(1000);

  // Set scripted demo shielding (prevent accidental death during recording)
  await page.evaluate(() => {
    player.takeDamage = function(amt) {
      this.integrity = Math.max(45, this.integrity - amt * 0.05);
    };
  });

  // 2. Start Lossless In-Engine Web Audio Stream Capture
  console.log('>>> STARTING PROCEDURAL WEB AUDIO STREAM RECORDING (MEDIARECORDER)...');
  await page.evaluate(() => {
    window.gameAudioChunks = [];
    const dest = audioEngine.ctx.createMediaStreamDestination();
    audioEngine.masterGain.connect(dest);
    window.gameAudioRecorder = new MediaRecorder(dest.stream, { mimeType: 'audio/webm' });
    window.gameAudioRecorder.ondataavailable = e => {
      if (e.data.size > 0) window.gameAudioChunks.push(e.data);
    };
    window.gameAudioRecorder.start(100);
  });

  console.log('>>> [3/4] EXECUTING 120-SECOND CHOREOGRAPHED GAMEPLAY SIMULATION...');

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // --- ACT 1: ZERO LUX SENSORY INVERSION (0s -> 18s) ---
  console.log('--- ACT 1: ZERO LUX DARKNESS & ACOUSTIC SONAR ARRAY (0s - 18s) ---');
  await page.evaluate(() => player.triggerSonarPing(labyrinth, audioEngine, predators));
  await sleep(2500);

  await page.evaluate(() => {
    player.vx = 40;
    player.vy = -60;
  });
  await sleep(2500);

  await page.evaluate(() => player.triggerSonarPing(labyrinth, audioEngine, predators));
  await sleep(3500);

  await page.evaluate(() => {
    player.vx = -70;
    player.vy = -70;
  });
  await sleep(3500);

  await page.evaluate(() => player.triggerSonarPing(labyrinth, audioEngine, predators));
  await sleep(4000);

  // --- ACT 2: CORRIDOR INFILTRATION & STEALTH CREEP (18s -> 36s) ---
  console.log('--- ACT 2: SECTOR ALPHA INFILTRATION & STEALTH CREEP (18s - 36s) ---');
  for (let step = 0; step < 4; step++) {
    await page.evaluate(s => {
      const targetX = 1200 - (s + 1) * 160;
      const targetY = 1150 - (s + 1) * 140;
      player.x = targetX;
      player.y = targetY;
      player.isCreeping = true;
      if (s % 2 === 0) {
        player.triggerSonarPing(labyrinth, audioEngine, predators);
      }
    }, step);
    await sleep(4500);
  }

  // --- ACT 3: ANCHOR ALPHA (432 Hz) HETERODYNE PHASE LOCKING (36s -> 56s) ---
  console.log('--- ACT 3: ANCHOR ALPHA (432 Hz) HETERODYNE PHASE-LOCKING (36s - 56s) ---');
  await page.evaluate(() => {
    player.x = 420;
    player.y = 440;
    player.vx = 0;
    player.vy = 0;
    player.triggerSonarPing(labyrinth, audioEngine, predators);
  });
  await sleep(2000);

  console.log('>>> SYNCHRONIZING ANCHOR ALPHA: LISSAJOUS PHASE CONVERGENCE...');
  for (let sync = 1; sync <= 10; sync++) {
    await page.evaluate(s => {
      const a = anchors[0];
      a.state = 1;
      a.syncProgress = s / 10;
      const detune = (1 - a.syncProgress) * 24.0;
      if (!audioEngine.tuneActive) {
        audioEngine.startTuning(a.freq, detune);
      } else {
        audioEngine.updateTuning(a.freq + detune);
      }
      if (s === 10) {
        a.state = 2;
        audioEngine.stopTuning(true);
        announce('ANCHOR ALPHA (432 Hz) SYNCHRONIZED!');
      }
    }, sync);
    await sleep(1800);
  }

  // --- ACT 4: APEX LURKER ENCOUNTER & TACTICAL ACOUSTIC DECOY (56s -> 78s) ---
  console.log('--- ACT 4: APEX LURKER ENCOUNTER & TACTICAL DECOY DIVERSION (56s - 78s) ---');
  await page.evaluate(() => {
    const lurker = predators[0];
    lurker.x = 420;
    lurker.y = 680;
    lurker.state = 2;
    lurker.vx = 0;
    lurker.vy = -160;
    announce('WARNING: APEX LURKER ACQUIRED VISUAL-ACOUSTIC VECTOR!');
  });
  await sleep(3500);

  await page.evaluate(() => player.triggerSonarPing(labyrinth, audioEngine, predators));
  await sleep(2500);

  console.log('>>> LAUNCHING TACTICAL ACOUSTIC DECOY TOWARD SIDE CORRIDOR...');
  await page.evaluate(() => {
    launchDecoy(player.x, player.y, 750, 450, labyrinth, audioEngine, predators);
  });
  await sleep(4000);

  await page.evaluate(() => {
    player.x = 580;
    player.y = 350;
    player.triggerSonarPing(labyrinth, audioEngine, predators);
  });
  await sleep(5000);

  await page.evaluate(() => {
    player.x = 850;
    player.y = 450;
    player.triggerSonarPing(labyrinth, audioEngine, predators);
  });
  await sleep(5000);

  // --- ACT 5: REAL-WORLD MICROPHONE ECHOLOCATION & SECTOR BETA (78s -> 100s) ---
  console.log('--- ACT 5: REAL-WORLD MIC ECHOLOCATION & ANCHOR BETA/GAMMA (78s - 100s) ---');
  await page.evaluate(() => {
    audioEngine.toggleMicrophone();
  });
  await sleep(2000);

  for (let clap = 0; clap < 3; clap++) {
    console.log(`>>> SIMULATING ACOUSTIC HAND CLAP PULSE #${clap + 1}...`);
    await page.evaluate(c => {
      player.x = 1100 + c * 250;
      player.y = 450;
      player.triggerSonarPing(labyrinth, audioEngine, predators, 1.15);
      const fill = document.getElementById('micMeterFill');
      const val = document.getElementById('micVolVal');
      if (fill && val) {
        fill.style.width = '88%';
        val.innerText = '88%';
      }
      announce('VOICE / CLAP WAVE DETECTED!');
    }, clap);
    await sleep(4500);
  }

  await page.evaluate(() => {
    anchors[1].state = 2;
    anchors[1].syncProgress = 1.0;
    anchors[2].state = 2;
    anchors[2].syncProgress = 1.0;
    player.triggerSonarPing(labyrinth, audioEngine, predators);
    announce('ALL 3 RESONANT FREQUENCIES SYNCHRONIZED!');
  });
  await sleep(6500);

  // --- ACT 6: CENTRAL EXTRACTION BEACON & VICTORY SEQUENCE (100s -> 120s) ---
  console.log('--- ACT 6: CENTRAL EXTRACTION BEACON & MISSION ACCOMPLISHED (100s - 120s) ---');
  await page.evaluate(() => {
    beacon.unlocked = true;
    player.x = 1200;
    player.y = 1200;
    beacon.pulseTimer = 2.0;
  });
  await sleep(3000);

  await page.evaluate(() => {
    triggerGameOver(true);
  });
  console.log('>>> VICTORY SEQUENCE ENGAGED // HOLDING ON TELEMETRY AUDIT SCREEN...');
  await sleep(15000);

  // 3. Extract Lossless Game Audio Stream
  console.log('>>> EXTRACTING IN-ENGINE LOSSLESS AUDIO STREAM...');
  const audioBase64 = await page.evaluate(async () => {
    window.gameAudioRecorder.stop();
    await new Promise(r => setTimeout(r, 400));
    const blob = new Blob(window.gameAudioChunks, { type: 'audio/webm' });
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(blob);
    });
  });

  fs.writeFileSync(GAME_AUDIO_WEBM, Buffer.from(audioBase64, 'base64'));
  console.log(`>>> GAME AUDIO SAVED: ${fs.statSync(GAME_AUDIO_WEBM).size} bytes`);

  // Finalize video recording: close page first so Playwright flushes the video file cleanly
  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  const rawVideoPath = await video.path();
  console.log(`>>> RAW GAMEPLAY VIDEO FINALIZED: ${rawVideoPath} (${fs.statSync(rawVideoPath).size} bytes)`);

  // 4. Mux Video + Procedural Web Audio + Synchronized Mastered Neural Voiceover via FFmpeg
  console.log('>>> [4/4] MUXING FINAL 1080p MP4 DEMO WITH DYNAMIC SIDECHAIN DUCKING VIA FFMPEG...');

  // Strict dynamic sidechain ducking:
  // -18 dB game SFX attenuation during speech segments, with 0.15s attack (150ms) and 0.4s smooth decay release (400ms)
  const filterGraph = [
    '[1:a]aformat=channel_layouts=stereo[game]',
    '[2:a]aformat=channel_layouts=stereo,asplit=2[v_ctrl][v_mix]',
    '[game][v_ctrl]sidechaincompress=threshold=0.03:ratio=10:attack=150:release=400:level_in=1[ducked]',
    '[ducked][v_mix]amix=inputs=2:dropout_transition=0,alimiter=limit=0.95:attack=5:release=50[aout]'
  ].join(';');

  const ffmpegCmd = `ffmpeg -y -i "${rawVideoPath}" -i "${GAME_AUDIO_WEBM}" -i "${VOICEOVER_WAV}" ` +
    `-filter_complex "${filterGraph}" ` +
    `-map 0:v -map "[aout]" ` +
    `-c:v libx264 -pix_fmt yuv420p -preset medium -crf 19 -c:a aac -b:a 192k ` +
    `-t 120 "${OUTPUT_MP4}"`;

  console.log(`Executing FFmpeg:\n${ffmpegCmd}`);
  execSync(ffmpegCmd, { stdio: 'inherit' });

  // Verification
  if (!fs.existsSync(OUTPUT_MP4) || fs.statSync(OUTPUT_MP4).size === 0) {
    throw new Error('Final MP4 render failed or produced empty file!');
  }

  const fileSizeMb = (fs.statSync(OUTPUT_MP4).size / (1024 * 1024)).toFixed(2);
  console.log(`\n==============================================================================`);
  console.log(`>>> DEMO VIDEO GENERATION COMPLETE: ${OUTPUT_MP4}`);
  console.log(`>>> FILE SIZE: ${fileSizeMb} MB | RESOLUTION: 1920x1080 | DURATION: 120s`);
  console.log(`==============================================================================\n`);

  // Reveal in Windows Explorer
  try {
    execSync(`explorer.exe /select,"${OUTPUT_MP4}"`);
    console.log('>>> REVEALED MP4 IN WINDOWS EXPLORER.');
  } catch (e) {
    console.log('Explorer reveal completed.');
  }
}

run().catch(err => {
  console.error('ERROR DURING TRAILER GENERATION:', err);
  process.exit(1);
});
