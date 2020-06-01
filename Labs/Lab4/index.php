<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
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
<h1>List of all files</h1>
<?=_listFiles()?>
<h1>List of courses</h1>
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
      $content = "<ul>";
      foreach($files as $filename) {
          $content .= "<li>$filename</li>";
      }
      return $content .= "</ul>";
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
