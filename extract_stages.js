// Node.js script to extract stage data from HTML files
const fs = require('fs');
const path = require('path');

const stageFiles = [
  'stage1.html', 'stage2.html', 'stage3.html', 'stage4.html', 'stage5.html',
  'stage6.html', 'stage7.html', 'stage8.html', 'stage9.html',
  'day2-stage1.html', 'day2-stage2.html', 'day2-stage3.html', 'day2-stage4.html',
  'day2-stage5.html', 'day2-stage6.html', 'day2-stage7.html', 'day2-stage8.html', 'day2-stage9.html'
];

const stages = [];

stageFiles.forEach((file, index) => {
  const filePath = path.join(__dirname, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const day = file.startsWith('day2') ? 'Day 2' : 'Day 1';
  const stageNum = file.match(/stage(\d+)/)[1];
  
  // Extract range
  const rangeMatch = content.match(/<div class="range-header">[\s\S]*?<div>(.*?)<\/div>/);
  const range = rangeMatch ? rangeMatch[1] : '';
  
  // Extract stage label
  const stageLabelMatch = content.match(/<div class="stage-label">(.*?)<\/div>/);
  const stageLabel = stageLabelMatch ? stageLabelMatch[1] : `Stage ${stageNum}`;
  
  // Extract title
  const titleMatch = content.match(/<h1>(.*?)<\/h1>/s);
  const title = titleMatch ? titleMatch[1].replace(/<br>/g, ' ').trim() : '';
  
  // Extract sponsor
  const sponsorMatch = content.match(/<div class="sponsor-logo">(.*?)<\/div>/);
  const sponsor = sponsorMatch ? sponsorMatch[1] : 'Pure Precision';
  
  // Extract stats
  const timeMatch = content.match(/<div class="stat-label">Time<\/div>[\s\S]*?<div class="stat-value">(\d+)<\/div>/);
  const time = timeMatch ? timeMatch[1] : '';
  
  const roundsMatch = content.match(/<div class="stat-label">Rounds<\/div>[\s\S]*?<div class="stat-value">(\d+)<\/div>/);
  const rounds = roundsMatch ? roundsMatch[1] : '';
  
  const distanceMatch = content.match(/<div class="stat-label">Distance<\/div>[\s\S]*?<div class="stat-value">(.*?)<\/div>/);
  const distance = distanceMatch ? distanceMatch[1] : '';
  
  // Extract Course of Fire
  const cofMatch = content.match(/<h2>Course of Fire<\/h2>([\s\S]*?)<div class="important">/);
  let cof = '';
  if (cofMatch) {
    cof = cofMatch[1].trim();
  }
  
  // Extract Important Notes
  const notesMatch = content.match(/<div class="important-title">Important Notes<\/div>[\s\S]*?<ul>([\s\S]*?)<\/ul>/);
  const notes = [];
  if (notesMatch) {
    const noteItems = notesMatch[1].match(/<li>(.*?)<\/li>/g);
    if (noteItems) {
      noteItems.forEach(item => {
        notes.push(item.replace(/<\/?li>/g, '').trim());
      });
    }
  }
  
  // Extract Start Position
  const startPosMatch = content.match(/<h2>Start Position<\/h2>[\s\S]*?<p>([\s\S]*?)<\/p>/);
  const startPosition = startPosMatch ? startPosMatch[1].trim() : '';
  
  // Extract Rules & Notes
  const rulesMatch = content.match(/<h2>Rules & Notes<\/h2>[\s\S]*?<ul>([\s\S]*?)<\/ul>/);
  const rulesNotes = [];
  if (rulesMatch) {
    const ruleItems = rulesMatch[1].match(/<li>(.*?)<\/li>/g);
    if (ruleItems) {
      ruleItems.forEach(item => {
        rulesNotes.push(item.replace(/<\/?li>/g, '').trim());
      });
    }
  }
  
  // Extract Target Summary
  const targetMatch = content.match(/<h2>Target Summary<\/h2>[\s\S]*?<p>([\s\S]*?)<\/p>/);
  const targetSummary = targetMatch ? targetMatch[1].trim() : '';
  
  stages.push({
    day,
    range,
    stage: stageLabel,
    title,
    sponsor,
    rounds,
    time,
    distance,
    cof,
    notes,
    start_position: startPosition,
    rules_notes: rulesNotes,
    target_summary: targetSummary
  });
});

console.log('const stages = ' + JSON.stringify(stages, null, 2) + ';');
