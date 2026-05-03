const questions = {
  student: [
    { question: 'What is your main goal? (Exams / Skill learning / Both)' },
    { question: 'Which subjects need more focus?' },
    { question: 'What are your school/college timings?' },
    { question: 'What time do you wake up and sleep?' },
    { question: 'How many hours can you study daily?' },
    { question: 'When are you most productive?' },
    { question: 'Do you prefer one subject or multiple subjects per day?' },
    { question: 'What distracts you the most?' },
    { question: 'Do you prefer a strict or flexible schedule?' },
    { question: 'Do you want breaks included?' }
  ],
  professional: [
    { question: 'What is your main goal? (Work / Skill / Fitness / Balance)' },
    { question: 'What are your working hours?' },
    { question: 'What time do you wake up and sleep?' },
    { question: 'How many extra hours can you dedicate daily?' },
    { question: 'How mentally tiring is your work? (Low/Medium/High)' },
    { question: 'When are you most productive?' },
    { question: 'Do you prefer deep work or short tasks?' },
    { question: 'What distracts you the most?' },
    { question: 'Do you prefer a strict or flexible schedule?' },
    { question: 'Do you want time for personal activities?' }
  ],
  jobseeker: [
    { question: 'What is your goal? (Job / Government exam / Skill upgrade)' },
    { question: 'Which areas need focus? (Aptitude / Coding / Subjects)' },
    { question: 'How many hours can you study daily?' },
    { question: 'What time do you wake up and sleep?' },
    { question: 'Are you attending any coaching classes?' },
    { question: 'When are you most productive?' },
    { question: 'Do you prefer long or short study sessions?' },
    { question: 'What distracts you the most?' },
    { question: 'How consistent are you? (Low/Medium/High)' },
    { question: 'Do you prefer a strict or flexible schedule?' }
  ],
  freelancer: [
    { question: 'What is your main goal? (Income / Skill / Balance)' },
    { question: 'Do you have fixed working hours? (Yes/No)' },
    { question: 'How many hours can you work daily?' },
    { question: 'What time do you usually wake up and sleep?' },
    { question: 'When are you most productive?' },
    { question: 'Do you work on multiple projects?' },
    { question: 'What distracts you the most?' },
    { question: 'Do you prefer structured or flexible schedules?' },
    { question: 'Do you want time for personal development?' }
  ],
  homemaker: [
    { question: 'What is your main goal? (Home management / Fitness / Learning)' },
    { question: 'What are your daily responsibilities?' },
    { question: 'What time do you wake up and sleep?' },
    { question: 'How many free hours do you get daily?' },
    { question: 'When are you most free/productive?' },
    { question: 'Do you want to include personal time?' },
    { question: 'What distracts or interrupts your routine?' },
    { question: 'Do you prefer a fixed or flexible routine?' },
    { question: 'Do you want breaks included?' }
  ],
  entrepreneur: [
    { question: 'What is your main goal? (Growth / Productivity / Balance)' },
    { question: 'What are your typical working hours?' },
    { question: 'What time do you wake up and sleep?' },
    { question: 'How many hours can you focus daily?' },
    { question: 'How unpredictable is your schedule? (Low/Medium/High)' },
    { question: 'When are you most productive?' },
    { question: 'Do you handle multiple tasks daily?' },
    { question: 'What distracts you the most?' },
    { question: 'Do you prefer strict or flexible schedules?' },
    { question: 'Do you want time for planning and strategy?' }
  ]
};

const roleNames = {
  student: 'Student',
  professional: 'Working Professional',
  jobseeker: 'Job Seeker',
  freelancer: 'Freelancer / Self-Employed',
  homemaker: 'Homemaker',
  entrepreneur: 'Entrepreneur / Business Owner'
};

let selectedRole = null;
let currentIndex = 0;
let answers = [];
let scheduleData = [];

const roleButtons = document.querySelectorAll('.role-button');
const quizCard = document.getElementById('quizCard');
const roleCard = document.getElementById('roleCard');
const scheduleCard = document.getElementById('scheduleCard');
const reminderCard = document.getElementById('reminderCard');
const questionText = document.getElementById('questionText');
const answerInput = document.getElementById('answerInput');
const quizTitle = document.getElementById('quizTitle');
const quizSubtitle = document.getElementById('quizSubtitle');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const prevQuestionBtn = document.getElementById('prevQuestionBtn');
const changeRoleBtn = document.getElementById('changeRoleBtn');
const scheduleList = document.getElementById('scheduleList');
const reminderList = document.getElementById('reminderList');
const editScheduleBtn = document.getElementById('editScheduleBtn');
const editPanel = document.getElementById('editPanel');
const editFields = document.getElementById('editFields');
const saveScheduleBtn = document.getElementById('saveScheduleBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const restartBtn = document.getElementById('restartBtn');
const scheduleDescription = document.getElementById('scheduleDescription');

roleButtons.forEach(button => {
  button.addEventListener('click', () => selectRole(button.dataset.role, button));
});

changeRoleBtn.addEventListener('click', () => resetToRoleSelect());
nextQuestionBtn.addEventListener('click', () => handleAnswer(true));
prevQuestionBtn.addEventListener('click', () => handleAnswer(false));
editScheduleBtn.addEventListener('click', () => toggleEditPanel());
saveScheduleBtn.addEventListener('click', () => saveSchedule());
cancelEditBtn.addEventListener('click', () => cancelEdit());
restartBtn.addEventListener('click', () => resetAll());

function selectRole(role, button) {
  selectedRole = role;
  currentIndex = 0;
  answers = new Array(questions[role].length).fill('');
  roleButtons.forEach(btn => btn.classList.toggle('active', btn === button));
  roleCard.classList.add('hidden');
  quizCard.classList.remove('hidden');
  scheduleCard.classList.add('hidden');
  reminderCard.classList.add('hidden');
  editPanel.classList.add('hidden');
  answerInput.value = '';
  updateQuestion();
}

function updateQuestion() {
  const questionObj = questions[selectedRole][currentIndex];
  quizTitle.textContent = `${roleNames[selectedRole]} — Question ${currentIndex + 1} of ${questions[selectedRole].length}`;
  quizSubtitle.textContent = questionObj.question;
  questionText.textContent = questionObj.question;
  answerInput.value = answers[currentIndex] || '';
  prevQuestionBtn.disabled = currentIndex === 0;
  nextQuestionBtn.textContent = currentIndex === questions[selectedRole].length - 1 ? 'Finish' : 'Next';
  answerInput.focus();
}

function handleAnswer(forward) {
  const value = answerInput.value.trim();
  if (forward && !value) {
    alert('Please enter your answer before continuing.');
    return;
  }

  if (forward) {
    answers[currentIndex] = value;
    if (currentIndex < questions[selectedRole].length - 1) {
      currentIndex += 1;
      updateQuestion();
    } else {
      createSchedule();
    }
  } else {
    answers[currentIndex] = value;
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateQuestion();
    }
  }
}

function resetToRoleSelect() {
  selectedRole = null;
  currentIndex = 0;
  answers = [];
  roleCard.classList.remove('hidden');
  quizCard.classList.add('hidden');
  scheduleCard.classList.add('hidden');
  reminderCard.classList.add('hidden');
  editPanel.classList.add('hidden');
  answerInput.value = '';
  roleButtons.forEach(btn => btn.classList.remove('active'));
}

function createSchedule() {
  quizCard.classList.add('hidden');
  scheduleCard.classList.remove('hidden');
  reminderCard.classList.remove('hidden');
  editPanel.classList.add('hidden');
  scheduleData = buildSchedule(selectedRole, answers);
  renderSchedule();
  renderReminders();
}

function buildSchedule(role, answers) {
  const cleaned = answers.map(a => a.trim());
  const defaultWake = '7:00 AM';
  const defaultSleep = '11:00 PM';
  const wakeSleep = cleaned.find(a => /wake|sleep/i.test(a)) || '';
  const [wakeTime, sleepTime] = parseWakeSleep(wakeSleep) || [defaultWake, defaultSleep];
  const productivity = cleaned.find(a => /(morning|evening|afternoon|night)/i.test(a)) || 'morning';
  const strictFlexible = cleaned.find(a => /(strict|flexible)/i.test(a)) || 'flexible';
  const breaks = /yes/i.test(cleaned.join(''));

  const baseTimes = generateTimeBlocks(wakeTime, sleepTime, 5);
  const schedule = [];

  const goal = cleaned[0] || '';
  const focus = cleaned[1] || '';
  const mainTask = role === 'student' ? `Study ${focus || 'your top subjects'}`
    : role === 'professional' ? `${goal} and work priorities`
    : role === 'jobseeker' ? `Prepare for ${focus || 'your next opportunity'}`
    : role === 'freelancer' ? `${goal} projects and client work`
    : role === 'homemaker' ? `${goal} routines and household tasks`
    : `${goal} business work and planning`;

  const breakLabel = breaks ? 'Take a short break and refresh' : 'Continue with your focus period';
  const personalTime = /yes/i.test(cleaned.join('')) ? 'Include personal development or family time.' : 'Keep a short break for self-care.';

  if (role === 'student') {
    schedule.push({ time: baseTimes[0], task: 'Morning review and planning.', details: `Aim for your best subject first.` });
    schedule.push({ time: baseTimes[1], task: 'Class/lecture time or focused study.', details: `Use your schedule: ${cleaned[2]}.` });
    schedule.push({ time: baseTimes[2], task: mainTask, details: `Prefer ${cleaned[6] || 'multiple subjects'}.` });
    schedule.push({ time: baseTimes[3], task: breakLabel, details: `Avoid ${cleaned[7] || 'distractions'}.` });
    schedule.push({ time: baseTimes[4], task: 'Review and practice.', details: `Schedule around ${productivity}.` });
  } else if (role === 'professional') {
    schedule.push({ time: baseTimes[0], task: 'Morning preparation and priority setting.', details: `Main goal: ${goal}.` });
    schedule.push({ time: baseTimes[1], task: 'Focused work block.', details: `Deep work or short tasks: ${cleaned[6]}.` });
    schedule.push({ time: baseTimes[2], task: breaks ? 'Lunch and recharge.' : 'Continue productivity.', details: `Stay steady after ${cleaned[5]}.` });
    schedule.push({ time: baseTimes[3], task: 'Extra hours for skill-building or personal activities.', details: personalTime });
    schedule.push({ time: baseTimes[4], task: 'Evening wrap-up and planning.', details: `Finish strong before ${sleepTime}.` });
  } else if (role === 'jobseeker') {
    schedule.push({ time: baseTimes[0], task: 'Morning goal review and application planning.', details: `Goal: ${goal}.` });
    schedule.push({ time: baseTimes[1], task: `Practice ${focus || 'your focus areas'}.`, details: `Coaching: ${cleaned[4] || 'none'}.` });
    schedule.push({ time: baseTimes[2], task: 'Focused study or coding practice.', details: `Prefer ${cleaned[7]}.` });
    schedule.push({ time: baseTimes[3], task: breakLabel, details: `Consistency: ${cleaned[8]}.` });
    schedule.push({ time: baseTimes[4], task: 'Review progress and set next targets.', details: 'Stay flexible as needed.' });
  } else if (role === 'freelancer') {
    schedule.push({ time: baseTimes[0], task: 'Plan your top projects.', details: `Goal: ${goal}.` });
    schedule.push({ time: baseTimes[1], task: /yes/i.test(cleaned[1]) ? 'Fixed project work.' : 'Flexible project timing.', details: /yes/i.test(cleaned[5]) ? 'Multiple projects' : 'Single main task' });
    schedule.push({ time: baseTimes[2], task: 'Skill building and personal development.', details: personalTime });
    schedule.push({ time: baseTimes[3], task: breakLabel, details: `Avoid distractions like ${cleaned[6]}.` });
    schedule.push({ time: baseTimes[4], task: 'Evening review and next-day planning.', details: `Keep your schedule ${strictFlexible}.` });
  } else if (role === 'homemaker') {
    schedule.push({ time: baseTimes[0], task: 'Morning routine and home planning.', details: `Responsibilities: ${cleaned[1]}.` });
    schedule.push({ time: baseTimes[1], task: 'Focused home or personal time.', details: `Free hours: ${cleaned[3]}.` });
    schedule.push({ time: baseTimes[2], task: 'Household tasks and errands.', details: `Most productive: ${cleaned[4]}.` });
    schedule.push({ time: baseTimes[3], task: 'Personal time and breaks.', details: personalTime });
    schedule.push({ time: baseTimes[4], task: 'Evening reflection and planning.', details: `Routine style: ${cleaned[7]}.` });
  } else if (role === 'entrepreneur') {
    schedule.push({ time: baseTimes[0], task: 'Start with growth and goal setting.', details: `Goal: ${goal}.` });
    schedule.push({ time: baseTimes[1], task: 'Primary focus and strategy work.', details: `Working hours: ${cleaned[1]}.` });
    schedule.push({ time: baseTimes[2], task: 'Flexible task execution.', details: `Schedule unpredictability: ${cleaned[4]}.` });
    schedule.push({ time: baseTimes[3], task: 'Planning, meetings, and follow-ups.', details: `Preferred schedule: ${cleaned[8]}.` });
    schedule.push({ time: baseTimes[4], task: 'Review results and set tomorrow\'s priorities.', details: personalTime });
  }

  if (breaks && schedule.length > 0) {
    schedule.splice(2, 0, { time: 'Midday', task: 'Take a healthy break', details: 'Recharge with movement and water.' });
  }

  return schedule;
}

function parseWakeSleep(value) {
  if (!value) return null;
  const parts = value.split(/\s*[,\-|and\/]+\s*/);
  if (parts.length >= 2) {
    return [formatTime(parts[0]), formatTime(parts[1])];
  }
  return null;
}

function formatTime(text) {
  const cleaned = text.trim().toLowerCase();
  const match = cleaned.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
  if (!match) return text;
  let hour = parseInt(match[1], 10);
  const minute = match[2] ? match[2] : '00';
  const period = match[3] || (hour >= 12 ? 'pm' : 'am');
  if (period === 'pm' && hour < 12) hour += 12;
  if (period === 'am' && hour === 12) hour = 0;
  const displayHour = ((hour + 11) % 12) + 1;
  return `${displayHour}:${minute} ${period}`;
}

function generateTimeBlocks(wakeTime, sleepTime, count) {
  const start = parseHour(wakeTime);
  const end = parseHour(sleepTime);
  const duration = Math.max(1, end > start ? end - start : end + 24 - start);
  const step = Math.max(1, Math.floor(duration / (count + 1)));
  const blocks = [];
  for (let i = 0; i < count; i += 1) {
    blocks.push(formatHour(start + step * i));
  }
  return blocks;
}

function parseHour(time) {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i);
  if (!match) return 7;
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3].toLowerCase();
  if (period === 'pm' && hour < 12) hour += 12;
  if (period === 'am' && hour === 12) hour = 0;
  return hour + minute / 60;
}

function formatHour(hourValue) {
  const normalized = ((hourValue % 24) + 24) % 24;
  const hour = Math.floor(normalized);
  const minute = Math.round((normalized - hour) * 60);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = ((hour + 11) % 12) + 1;
  const displayMinute = minute.toString().padStart(2, '0');
  return `${displayHour}:${displayMinute} ${period}`;
}

function renderSchedule() {
  scheduleList.innerHTML = '';
  scheduleData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'schedule-item';
    card.innerHTML = `
      <h3>${item.time}</h3>
      <p class="schedule-task"><strong>${item.task}</strong></p>
      <p>${item.details}</p>
    `;
    scheduleList.appendChild(card);
  });
  scheduleDescription.textContent = `Here is your suggested daily timetable for ${roleNames[selectedRole]}. Customize it below if you want.`;
}

function renderReminders() {
  reminderList.innerHTML = '';
  const reminders = generateReminders(selectedRole, answers);
  reminders.forEach(text => {
    const li = document.createElement('li');
    li.className = 'reminder-item';
    li.innerHTML = `<span>${text}</span>`;
    reminderList.appendChild(li);
  });
}

function generateReminders(role, answers) {
  const base = [];
  const wakeSleep = answers.find(a => /wake|sleep/i.test(a)) || '';
  base.push('Review your schedule first thing every morning.');
  base.push('Set at least one reminder for the top priority task.');
  if (/yes/i.test(answers.join(''))) {
    base.push('Take regular breaks to avoid burnout.');
  }
  if (role === 'student') {
    base.push('Keep your most difficult subject early in the day.');
  } else if (role === 'professional') {
    base.push('Block out time for deep work when you are most productive.');
  } else if (role === 'jobseeker') {
    base.push('Spend time daily on applications and practice questions.');
  } else if (role === 'freelancer') {
    base.push('Track deadlines and update your schedule every evening.');
  } else if (role === 'homemaker') {
    base.push('Reserve a small slot for personal time each day.');
  } else if (role === 'entrepreneur') {
    base.push('Keep planning and strategy time protected each day.');
  }
  if (wakeSleep) {
    base.push(`Aim to keep consistent wake and sleep times based on your routine: ${wakeSleep}.`);
  }
  return base;
}

function toggleEditPanel() {
  if (editPanel.classList.contains('hidden')) {
    populateEditFields();
    editPanel.classList.remove('hidden');
    editScheduleBtn.textContent = 'Hide Editor';
  } else {
    editPanel.classList.add('hidden');
    editScheduleBtn.textContent = 'Edit Schedule';
  }
}

function populateEditFields() {
  editFields.innerHTML = '';
  scheduleData.forEach((item, index) => {
    const field = document.createElement('div');
    field.className = 'edit-field';
    field.innerHTML = `
      <label for="time-${index}">${item.time}</label>
      <input id="time-${index}" type="text" value="${item.time}" data-index="${index}" class="edit-time">
      <input id="task-${index}" type="text" value="${item.task}" data-index="${index}" placeholder="Task">
      <input id="detail-${index}" type="text" value="${item.details}" data-index="${index}" placeholder="Details" class="detail-input">
    `;
    editFields.appendChild(field);
  });
}

function saveSchedule() {
  const inputs = editFields.querySelectorAll('input');
  inputs.forEach(input => {
    const index = Number(input.dataset.index);
    if (input.id.startsWith('time-')) {
      scheduleData[index].time = input.value.trim() || scheduleData[index].time;
    }
    if (input.id.startsWith('task-')) {
      scheduleData[index].task = input.value.trim() || scheduleData[index].task;
    }
    if (input.id.startsWith('detail-')) {
      scheduleData[index].details = input.value.trim() || scheduleData[index].details;
    }
  });
  renderSchedule();
  editPanel.classList.add('hidden');
  editScheduleBtn.textContent = 'Edit Schedule';
}

function cancelEdit() {
  editPanel.classList.add('hidden');
  editScheduleBtn.textContent = 'Edit Schedule';
}

function resetAll() {
  selectedRole = null;
  currentIndex = 0;
  answers = [];
  scheduleData = [];
  scheduleList.innerHTML = '';
  reminderList.innerHTML = '';
  roleCard.classList.remove('hidden');
  quizCard.classList.add('hidden');
  scheduleCard.classList.add('hidden');
  reminderCard.classList.add('hidden');
  editPanel.classList.add('hidden');
  answerInput.value = '';
  roleButtons.forEach(btn => btn.classList.remove('active'));
}
