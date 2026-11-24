## PrepPath
PrepPath is a website which helps Pakistani students prepare for their university entry tests, It is made mainly for computer science/engineering students. 
As the entry tests in Pakistan are quite hard, and many students struggle to find resources for their respective universities and practice and improve their weak points, so I decided to create PrepPath to help all the students.
The website includes Mock Tests with 2500+ questions for all the subjects. It includes AI Bot to help you with your study. It shows universities and their respective tests and also tells which university is suitable for you based on your budget, location, etc. Moreover, it includes a leaderboard to compare your results with other students. 

<img width="1599" height="763" alt="image" src="https://github.com/user-attachments/assets/999be065-d66c-4a89-984e-7a4e1a1772f1" />

## Features
1. **Dashboard**: It shows the user's analytics, weak subjects, past tests, and goals.
2. **Universities**: It helps users find universities perfect for them if they are unsure. Moreover, it shows what are the subjects of each test.
3. **Mock Tests**: A page where users can take tests of each subject and know their result. Tests include AI explanations, correct answer/wrong answer.
4. **Bookmarks**: Users can bookmark the doubtful questions and can review them later.
5. **Study Resources**: A page where all the study resources are, and other users can also add to maintain collaborative learning.
6. **AI Study Coach**: AI chatbot specifically designed to help students in their problems relating to tests, admissions, etc.
7. **Analytics**: A page which gives deep analysis of past tests and weak points.
8. **Leaderboard**: A page which shows the progress of all registered users.

## Tech Stack
1. **React**: Used to build the website's user-friendly interface.
2. **Vite**: Used to run the development server and create a website
3. **Tailwind CSS**: Used to add styles and layout of the website
4. **Supabase**: Used as a database to store users' data and to connect other apps

## Development Journey
I started creating this website in June 2026 and I got it completed by the start of October. 
The hardest part for me was to gather the questions, to check each and every question's credibility and correctness so i took help from AI. 
I took AI's assistance to generate tests for me, and then i gave it every bunch of questions to check it.
The main thing I learned is that creating a startup isn't that hard, and nothing is impossible and you can definitely reach your goal.
I just started it as a side project, and now I have over 40 registered users.

## Installation
1. This project was made using Visual Studio Code, so I recommend that you use that.
2. Firstly, Node.js, npm and Git needs to be installed in your interface to get access to this project
3. Next, in your VS Code Powershell, enter this command:
```bash
git clone https://github.com/Ayesha-Asim/preppath
cd preppath
```
4. Next, install dependencies by using this command:
```bash
npm install
```
5. Now, create a file named as .env.local in the main PrepPath folder, and add this to the file:
```dotenv
VITE_SUPABASE_URL=https://idwegcgtfqpgguqtuson.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlkd2VnY2d0ZnFwZ2d1cXR1c29uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMzczNzUsImV4cCI6MjA5NTcxMzM3NX0.ihrMF643bToynHifzl8fx_tkLQOScMWVWXtldu_GcNU
```
6. To run the website locally on your browser, enter this command:
```bash
npm run dev
```
Vite will display this link to the project:
http://localhost:5173/

7. Lastly, run this project to check any errors. This checks TypeScript compilation and creates production-ready files:
```bash
npm run build
```

## Demo and Screenshots
Anyone can easily access the website at https://preppath-rosy.vercel.app and it is completely open to public.
The screenshot shows the dashboard page, the page where user lands after logging in.
The left panel shows more features that user can acess.

## AI Usage
This project was developed using AI's assistance. I used AI to write most of the website's code. I came up with the idea of creating this website, and i guided AI in each and every step, but AI wrote the code. 
I used AI to generate questions for the Mock Tests and I reviewed the questions.
I tested the website, and made minor changes by myself, and the most of the remaining development was done using AI.

## Contributing
This website PrepPath is managed and maintained by me. And as of now, I am not expecting external code contributions or pull requests.
But, I do allow other people to give me suggestions or improvements through Github issues, but not entire access.

## Deployment
Preppath is hosted on Vercel.
It can be accessed through https://preppath-rosy.vercel.app.
I used Github to manage the project's source code. 
