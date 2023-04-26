// function to set the active dot
    
  function Today(){

    const today = new Date();
    const day = today.toLocaleDateString('en-US', { weekday: 'long' });
    const month = today.toLocaleDateString('en-US', { month: 'long' });
    const date = today.getDate();
    const year = today.getFullYear();

    document.getElementById('day').innerHTML = `${date}`;
    document.getElementById('month').innerHTML = `${month}, ${year}`;  
    
    document.getElementById(
    'date'
  ).innerHTML = `${day}, ${month} ${date}, ${year}`;

 }  

  Today();

