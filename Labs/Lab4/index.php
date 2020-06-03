<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <link rel="stylesheet" href="index-style.css">
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
      <img class="mypic" src="Images/me.png" alt="A picture of me">
      <div class="content">
    <h2>My name is David Leavenworth. I am a Computer Science major with a software development concentration at University of The Pacific.</h2>
    <div class="courses">
    <h1>List of courses I have taken:</h1>
    <ul>
      <li>COMP-53 - Data Structures</li>
      <li>MATH-43- Pre-calculus</li>
      <li>PACS-1 - What is a good society?</li>
      <li>ENGR-10 - Deans seminar</li>
      <li>COMP-47 - Discrete Math</li>
      <li>COMP-55 - Application Development</li>
      <li>COMP-144 - Programming Languages</li>
      <li>ECON-053 - Introductory Microeconomics</li>
      <li>ECPE-071 - Digital Design</li>
      <li>HIST-030 - East Asian Civilization 1</li>
      <li>COMP-163 - Database Management Systems</li>
      <li>ECON-55 - Introductory Macroeconomics</li>
      <li>GESC-051 - Dynamic Planet</li>
    </ul>
  </div>
  <div class="projects">
    <h1>List of course projects I have completed:</h1>
    <ul>
      <li>COMP-163 Room Reservation System -
        This application stored room reservations in a SQL database
        and had a web front end to display and enter data.</li>
        <li>COMP-144 Lexer, Parser, and Evaluator - During the course of this project
          I created an interpreter for a very basic interpreted language.
          The interpreter was composed of a lexer, parser, and evaluator.</li>
          <li>COMP-55 Game - During the course of this project I was placed in
            a randomly assigned group and were to collaboriativly create a game.</li>
      </ul>
    </div>
    <div class="interests">
      <h1>My interests</h1>
      <p>I spend most of my free time playing video games or programming for fun.
        Other than that I enjoy reading science fiction and fantasy, and enjoying working on computers.</p>
      </div>
      <div class="interesting">
      <h1>Something interesting</h1>
      <p>I spent a little time trying to make an animation like this on my own but I didn't quite have enough time.
        So here's an example of what I was trying to make</p>
      </div>
      <p class="codepen" data-height="265" data-theme-id="light" data-default-tab="result" data-user="enesser" data-slug-hash="GcChq" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Simple Spinning Color Wheel, Pure CSS">
    <span>See the Pen <a href="https://codepen.io/enesser/pen/GcChq">
    Simple Spinning Color Wheel, Pure CSS</a> by Eric J Nesser (<a href="https://codepen.io/enesser">@enesser</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
  </p>
  <script async src="https://static.codepen.io/assets/embed/ei.js"></script>
  </div>
  <h1>Calendar:</h1>
<h1><?php echo date('F, Y'); ?>.</h1>
  <table>
    <tr>
      <th>Sun</th>
      <th>Mon</th>
      <th>Tue</th>
      <th>Wed</th>
      <th>Thu</th>
      <th>Fri</th>
      <th>Sat</th>
    </tr>
<?=_createCalendar()?>
</table>
<h1>List of all files:</h1>
<?=_listFiles()?>
<h1>List of courses:</h1>
<?=_listCourses()?>
</body>
</html>

  <?php
    function _createCalendar($currentDayOfWeek=null, $daysInMonth=null) {
      $content = null;
      $daysInMonth = date('t');
      $date = 1;
      $weekStart = date('w', mktime(0,0,0,date('n'), 1, date('Y')))+1;
      //Fill out empty days until the first day of the month
      $content .= "<tr>";
      if($weekStart > 1) {
        for($weekDay = 1; $weekDay < $weekStart; $weekDay++) {
          $content .= "<td>&nbsp;</td>";
        }
      }
      while(true) {
          if(date('w', mktime(0,0,0,date('n'), $date, date('Y'))) == 0) {
              $content .= "</tr><tr>";
          }
          if($date == date('j')) {
              $content .= "<td><strong>$date</strong></td>";
          }
          else {
               $content .= "<td>$date</td>";
          }
          $date++;
          if($date > $daysInMonth) {
              $content .= "</tr>";
              break;
          }
      }
      return $content;
  }

  function _listFiles() {
      $files = glob('*');
      $content = "";
      foreach($files as $filename) {
          $content .= "<li>$filename</li>";
      }
      return $content;
  }

  function _listCourses() {
      $content = null;
      $content = "<ul>";
      $file = fopen("courses.txt", "r") or die("File read error");
      $content = fread($file, filesize("courses.txt"));
      fclose($file);
      return $content .= "</ul>";
  }

    ?>
