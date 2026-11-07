/**
 * ==============================================================================
 * RESONANCE: Blind Vector — High-Definition (1080p) Gameplay Capture Engine
 * Automated Headless Milestone Screenshot Generator for Devpost / Wolfjam 2026
 * ==============================================================================
 */

const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = __dirname;
const SCREENSHOTS_DIR = path.join(PROJECT_DIR, 'screenshots');

// Ensure dedicated output directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function captureMilestones() {
  console.log('==============================================================================');
  console.log('>>> [1/3] INITIALIZING HEADLESS CHROMIUM AT 1920x1080 (FULL HD)...');
  console.log('==============================================================================');

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
    deviceScaleFactor: 1
  });

  const page = await context.newPage();
  console.log('>>> CONNECTING TO RESONANCE ENGINE AT http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });
  await sleep(1000);

  // Initialize Audio & Game Engine by clicking the launch link
  console.log('>>> ENGAGING ACOUSTIC SENSORY LINK...');
  await page.waitForSelector('#btnLaunch', { timeout: 10000 });
  await page.click('#btnLaunch');
  await sleep(1200);

  // Disable player death during photographic capture
  await page.evaluate(() => {
    player.takeDamage = function() {};
  });

  console.log('\n>>> [2/3] CAPTURING 6 CRITICAL GAMEPLAY MILESTONES...\n');

  // ----------------------------------------------------------------------------
  // MILESTONE 1: 01_zero_lux_tactical_hud.png
  // Initial 0-Lux dark state right after link engagement, telemetry (71 BPM) & HUD
  // ----------------------------------------------------------------------------
  console.log('>>> CAPTURING 01: ZERO LUX TACTICAL HUD...');
  await page.evaluate(() => {
    player.vx = 0;
    player.vy = 0;
    audioEngine.currentBpm = 71;
    audioEngine.targetBpm = 71;
    document.getElementById('bpmVal').innerHTML = '71 <span style="font-size:11px; font-weight:normal; color:var(--hud-dim);">BPM</span>';
    announce("ACOUSTIC SENSORY LINK ENGAGED // INITIALIZING 0-LUX SENSORY MATRIX");
  });
  await sleep(600);
  const path01 = path.join(SCREENSHOTS_DIR, '01_zero_lux_tactical_hud.png');
  await page.screenshot({ path: path01 });
  console.log(`    Saved: ${path01} (${fs.statSync(path01).size} bytes)`);

  // ----------------------------------------------------------------------------
  // MILESTONE 2: 02_lidar_sonar_wavefront.png
  // Active 360-ray cyan sonar point cloud reflecting off concrete labyrinth walls
  // ----------------------------------------------------------------------------
  console.log('>>> CAPTURING 02: 360-RAY ACOUSTIC LIDAR / SONAR WAVEFRONT...');
  await page.evaluate(() => {
    player.x = 1200;
    player.y = 1150;
    player.triggerSonarPing(labyrinth, audioEngine, predators, 1.35);
    announce("ACTIVE SONAR ARRAY: 360 RAYS CAST // 5,000 PHOSPHOR PARTICLES ENERGIZED");
  });
  // Wait ~350ms so acoustic wavefront expands and hits corridor walls creating luminous cyan reflections
  await sleep(380);
  const path02 = path.join(SCREENSHOTS_DIR, '02_lidar_sonar_wavefront.png');
  await page.screenshot({ path: path02 });
  console.log(`    Saved: ${path02} (${fs.statSync(path02).size} bytes)`);

  // ----------------------------------------------------------------------------
  // MILESTONE 3: 03_apex_predator_crimson_tracking.png
  // Crimson predator point cloud, active Doppler frequency shift, heart rate spike
  // ----------------------------------------------------------------------------
  console.log('>>> CAPTURING 03: APEX PREDATOR CRIMSON TRACKING & DOPPLER SHIFT...');
  await page.evaluate(() => {
    player.x = 850;
    player.y = 1000;
    
    // Position The Lurker close to the player in APEX HUNT state
    const lurker = predators[0];
    lurker.x = 980;
    lurker.y = 920;
    lurker.state = 2; // APEX HUNT
    lurker.vx = -190;
    lurker.vy = 80;

    // Simulate cardiac and telemetry spike
    audioEngine.currentBpm = 138;
    audioEngine.targetBpm = 140;
    document.getElementById('bpmVal').innerHTML = '138 <span style="font-size:11px; font-weight:normal; color:var(--hud-dim);">BPM</span>';
    document.getElementById('hudDoppler').innerText = '+84.2 Hz [CLOSING FAST]';
    document.getElementById('hudStealth').innerText = '0% [TARGET ACQUIRED]';
    document.getElementById('hudStealth').style.color = 'var(--crimson-threat)';
    
    // Fire ping to illuminate volatile predator crimson points
    player.triggerSonarPing(labyrinth, audioEngine, predators, 1.25);
    announce("WARNING: APEX LURKER DETECTED // DOPPLER VECTOR +84.2 Hz // HEART RATE 138 BPM");
  });
  await sleep(360);
  const path03 = path.join(SCREENSHOTS_DIR, '03_apex_predator_crimson_tracking.png');
  await page.screenshot({ path: path03 });
  console.log(`    Saved: ${path03} (${fs.statSync(path03).size} bytes)`);

  // ----------------------------------------------------------------------------
  // MILESTONE 4: 04_tactical_decoy_deployment.png
  // Kinetic sound decoy projectile impacting obstacle and drawing enemy vectors away
  // ----------------------------------------------------------------------------
  console.log('>>> CAPTURING 04: TACTICAL ACOUSTIC DECOY DEPLOYMENT...');
  await page.evaluate(() => {
    player.x = 600;
    player.y = 600;
    
    // Position Lurker investigating
    const lurker = predators[0];
    lurker.x = 420;
    lurker.y = 700;
    lurker.state = 1;

    // Launch acoustic sound decoy toward side corridor obstacle
    launchDecoy(player.x, player.y, 820, 480, labyrinth, audioEngine, predators);
    player.triggerSonarPing(labyrinth, audioEngine, predators, 0.9);
    announce("TACTICAL SOUND DECOY DEPLOYED // ACOUSTIC DISTRACTION WAVEFRONT ENGAGED");
  });
  await sleep(420);
  const path04 = path.join(SCREENSHOTS_DIR, '04_tactical_decoy_deployment.png');
  await page.screenshot({ path: path04 });
  console.log(`    Saved: ${path04} (${fs.statSync(path04).size} bytes)`);

  // ----------------------------------------------------------------------------
  // MILESTONE 5: 05_frequency_anchor_synchronization.png
  // Anchor Alpha (432 Hz) approach, Lissajous phase-locking & extraction graphics
  // ----------------------------------------------------------------------------
  console.log('>>> CAPTURING 05: EXTRACTION ANCHOR PHASE-LOCK SYNCHRONIZATION...');
  await page.evaluate(() => {
    // Position player next to Anchor Alpha (432 Hz)
    player.x = anchors[0].x + 48;
    player.y = anchors[0].y + 36;
    
    // Set anchor into active synchronization state
    anchors[0].state = 1;
    anchors[0].syncProgress = 0.72;
    currentTuningAnchor = anchors[0];
    
    // Show tuning HUD
    const tuningHud = document.getElementById('tuningHud');
    if (tuningHud) {
      tuningHud.classList.add('visible');
      document.getElementById('tuningAnchorTitle').innerText = 'SYNCHRONIZING ANCHOR ALPHA (432 Hz)';
      document.getElementById('tuningFill').style.width = '72%';
    }
    
    // Trigger acoustic pulse to illuminate harmonic Solfeggio chimes
    player.triggerSonarPing(labyrinth, audioEngine, predators, 1.15);
    announce("SYNCHRONIZING ANCHOR ALPHA (432 Hz) // LISSAJOUS PHASE LOCK: 72%");
  });
  await sleep(450);
  const path05 = path.join(SCREENSHOTS_DIR, '05_frequency_anchor_synchronization.png');
  await page.screenshot({ path: path05 });
  console.log(`    Saved: ${path05} (${fs.statSync(path05).size} bytes)`);

  // ----------------------------------------------------------------------------
  // MILESTONE 6: 06_binaural_audio_spectrum_master.png
  // Full master view: oscilloscope spectrum analyzer, directional audio compass, telemetry
  // ----------------------------------------------------------------------------
  console.log('>>> CAPTURING 06: BINAURAL AUDIO SPECTRUM & TELEMETRY MASTER VIEW...');
  await page.evaluate(() => {
    // Hide tuning HUD if visible
    const tuningHud = document.getElementById('tuningHud');
    if (tuningHud) tuningHud.classList.remove('visible');

    // Trigger directional audio compass
    triggerAudioCompass();

    // Enable mic visualizer meter in HUD
    const meterBar = document.getElementById('micMeterBar');
    const labelRow = document.getElementById('micLabelRow');
    const fill = document.getElementById('micMeterFill');
    const text = document.getElementById('micVolVal');
    const btn = document.getElementById('btnToggleMic');
    if (meterBar && labelRow && fill && text && btn) {
      meterBar.style.display = 'block';
      labelRow.style.display = 'flex';
      fill.style.width = '84%';
      text.innerText = '84%';
      btn.innerText = '[ MIC ECHOLOCATION: ACTIVE ]';
      btn.classList.add('active');
    }

    // Set all anchors synchronized
    anchors[0].state = 2;
    anchors[1].state = 2;
    anchors[2].state = 2;
    document.getElementById('anchorState0').className = 'anchor-state state-synced';
    document.getElementById('anchorState0').innerText = 'SYNCHRONIZED';
    document.getElementById('anchorState1').className = 'anchor-state state-synced';
    document.getElementById('anchorState1').innerText = 'SYNCHRONIZED';
    document.getElementById('anchorState2').className = 'anchor-state state-synced';
    document.getElementById('anchorState2').innerText = 'SYNCHRONIZED';
    document.getElementById('syncedCountText').innerText = '3 / 3';

    // Unlock central extraction nexus
    beacon.unlocked = true;

    // Pulse active sonar so audio oscilloscope has rich waveforms
    player.x = 1200;
    player.y = 1200;
    player.triggerSonarPing(labyrinth, audioEngine, predators, 1.4);
    announce("FULL TELEMETRY AUDIT: 3/3 ANCHORS RESOLVED // AUDIO COMPASS ACTIVE // NEXUS ONLINE");
  });
  await sleep(380);
  const path06 = path.join(SCREENSHOTS_DIR, '06_binaural_audio_spectrum_master.png');
  await page.screenshot({ path: path06 });
  console.log(`    Saved: ${path06} (${fs.statSync(path06).size} bytes)`);

  // Close browser cleanly
  await page.close();
  await context.close();
  await browser.close();

  // ----------------------------------------------------------------------------
  // VERIFICATION & EXPLORER REVEAL
  // ----------------------------------------------------------------------------
  console.log('\n==============================================================================');
  console.log('>>> [3/3] VERIFYING GENERATED SCREENSHOT SUITE...');
  console.log('==============================================================================');

  const requiredFiles = [
    '01_zero_lux_tactical_hud.png',
    '02_lidar_sonar_wavefront.png',
    '03_apex_predator_crimson_tracking.png',
    '04_tactical_decoy_deployment.png',
    '05_frequency_anchor_synchronization.png',
    '06_binaural_audio_spectrum_master.png'
  ];

  let allValid = true;
  for (const filename of requiredFiles) {
    const filePath = path.join(SCREENSHOTS_DIR, filename);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
      console.error(`ERROR: Missing or empty file: ${filename}`);
      allValid = false;
    } else {
      const sizeKb = (fs.statSync(filePath).size / 1024).toFixed(1);
      console.log(`  ✓ ${filename} [${sizeKb} KB] — 1920x1080 Full HD`);
    }
  }

  if (!allValid) {
    throw new Error('Screenshot verification failed: one or more files are missing or empty.');
  }

  console.log(`\n>>> ALL 6 SCREENSHOTS VERIFIED IN: ${SCREENSHOTS_DIR}`);
  console.log('>>> REVEALING SCREENSHOTS IN WINDOWS EXPLORER...');

  try {
    execSync(`explorer.exe "${SCREENSHOTS_DIR}"`);
    console.log('>>> EXPLORER OPENED SUCCESSFULLY.');
  } catch (err) {
    console.log('Explorer invocation completed.');
  }

  console.log('==============================================================================');
  console.log('>>> SCREENSHOT CAPTURE PIPELINE COMPLETE.');
  console.log('==============================================================================\n');
}

captureMilestones().catch(err => {
  console.error('FATAL ERROR DURING SCREENSHOT CAPTURE:', err);
  process.exit(1);
});
