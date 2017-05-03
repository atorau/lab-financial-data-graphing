$(document).ready(() => {
  const data = getData($('#datepicker1').val(), $('#datepicker2').val());

  function getData(date1, date2) {
    let tempUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";
    if (date1 != "" && date2 != "") {
      tempUrl = "http://api.coindesk.com/v1/bpi/historical/close.json?start=" + date1 + "&end=" + date2;
    } else {
      tempUrl = "http://api.coindesk.com/v1/bpi/historical/close.json"
    }
    $.ajax({
      url: tempUrl,
      method: "GET",
      data: "",
      dataType: "json",
      success: showFeedback,
      error: handleError
    })
  }
  // const data = getData($('#datepicker1').val(), $('#datepicker2').val());
  // console.log(data);

  $('#datepicker1').change(function() {
    var date1 = $('#datepicker1').val();
    var date2 = $('#datepicker2').val();
    console.log(date1, " ", date2)
    getData(date1, date2);
  });
  $('#datepicker2').change(function() {
    var date2 = $('#datepicker2').val();
    var date1 = $('#datepicker1').val();
    console.log(date1, " ", date2)

    getData(date1, date2);
  });
});


function showFeedback(postResponse) {
  console.log('post success');
  var dates = [];
  var values = [];
  dates = Object.keys(postResponse.bpi);
  values = Object.values(postResponse.bpi);
  console.log(dates);
  console.log(values);
  var ctx = $("#myChart");
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: values,
        spanGaps: false,
      }]
    }
  });
  console.log("test", myChart);
  console.log("test2", myChart.data);

  $('#myChart1').html(myChart);
}


function handleError(err) {
  console.log('Oh no! Error:');
  console.log(err);
}
