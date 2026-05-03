install.packages("plumber")
install.packages("dplyr")
library(plumber)

#* @apiTitle Brain Boost AI

# -------------------------------
# STEP 1: GET ROLE OPTIONS
# -------------------------------
#* @get /role
function(){
  return(list(
    roles = c("Student","Working Professional","Job Seeker",
              "Freelancer","Homemaker","Entrepreneur")
  ))
}

# -------------------------------
# STEP 2: GET QUESTIONS BASED ON ROLE
# -------------------------------
#* @param role
#* @get /questions
function(role){

  if(role == "Student"){
    return(list(
      q = c(
        "Main goal? (Exams/Skill/Both)",
        "Subjects needing focus?",
        "College timings?",
        "Wake up time?",
        "Sleep time?",
        "Study hours per day?",
        "Most productive time?",
        "Biggest distraction?",
        "Strict or flexible schedule?",
        "Include breaks?"
      )
    ))
  }

  else if(role == "Working Professional"){
    return(list(
      q = c(
        "Main goal? (Work/Skill/Fitness/Balance)",
        "Working hours?",
        "Wake up time?",
        "Sleep time?",
        "Extra hours available?",
        "Work stress level (Low/Medium/High)?",
        "Most productive time?",
        "Biggest distraction?",
        "Strict or flexible?",
        "Need personal time?"
      )
    ))
  }

  else if(role == "Job Seeker"){
    return(list(
      q = c(
        "Goal? (Job/Exam/Skill)",
        "Focus areas?",
        "Study hours?",
        "Wake up time?",
        "Sleep time?",
        "Coaching classes?",
        "Most productive time?",
        "Consistency level?",
        "Biggest distraction?",
        "Strict or flexible?"
      )
    ))
  }

  else if(role == "Freelancer"){
    return(list(
      q = c(
        "Main goal?",
        "Fixed working hours?",
        "Work hours per day?",
        "Wake up time?",
        "Sleep time?",
        "Most productive time?",
        "Multiple projects?",
        "Biggest distraction?",
        "Flexible or structured?"
      )
    ))
  }

  else if(role == "Homemaker"){
    return(list(
      q = c(
        "Main goal?",
        "Daily responsibilities?",
        "Wake up time?",
        "Sleep time?",
        "Free hours?",
        "Most productive time?",
        "Interruptions?",
        "Flexible or fixed?",
        "Need personal time?"
      )
    ))
  }

  else {
    return(list(
      q = c(
        "Main goal?",
        "Working hours?",
        "Wake up time?",
        "Sleep time?",
        "Focus hours?",
        "Schedule unpredictability?",
        "Most productive time?",
        "Multiple tasks?",
        "Biggest distraction?",
        "Flexible or strict?"
      )
    ))
  }
}

# -------------------------------
# STEP 3: ANALYSIS + SCHEDULE
# -------------------------------
#* @post /analyze
function(role, answers){

  answers <- unlist(strsplit(answers, ","))

  schedule <- list()
  problems <- c()

  # BASIC ANALYSIS
  if(any(grepl("late", answers))){
    problems <- c(problems, "Poor time management")
  }

  if(any(grepl("distraction", answers))){
    problems <- c(problems, "High distraction")
  }

  # ROLE-BASED SCHEDULE
  if(role == "Student"){

    schedule$Morning <- "Revise subjects (1 hr)"
    schedule$Afternoon <- "Classes / Study"
    schedule$Evening <- "Practice weak subjects"
    schedule$Night <- "Light revision + sleep"

  } else if(role == "Working Professional"){

    schedule$Morning <- "Planning + light exercise"
    schedule$Work <- "Deep work sessions"
    schedule$Evening <- "Skill improvement"
    schedule$Night <- "Relax + sleep"

  } else if(role == "Job Seeker"){

    schedule$Morning <- "Aptitude practice"
    schedule$Afternoon <- "Core subjects"
    schedule$Evening <- "Mock tests"
    schedule$Night <- "Revision"

  } else if(role == "Freelancer"){

    schedule$Morning <- "Client work"
    schedule$Afternoon <- "Project execution"
    schedule$Evening <- "Skill upgrade"
    schedule$Night <- "Planning next day"

  } else if(role == "Homemaker"){

    schedule$Morning <- "House tasks"
    schedule$Afternoon <- "Personal time"
    schedule$Evening <- "Learning / Fitness"
    schedule$Night <- "Relaxation"

  } else {

    schedule$Morning <- "Strategic planning"
    schedule$Day <- "Business operations"
    schedule$Evening <- "Growth activities"
    schedule$Night <- "Review + plan"
  }

  # REMINDERS
  reminders <- c(
    "⏰ Start your day strong",
    "📌 Stay focused",
    "📚 Keep learning",
    "🌙 Take proper rest"
  )

  return(list(
    role = role,
    problems = problems,
    schedule = schedule,
    reminders = reminders
  ))
}