
window.onload = async function admin_dashboard_stats(){
    const ctx = document.getElementById('bar-chart').getContext('2d');
    try{
        let bar_data = await fetch("http://localhost:5000/owner/dashboard/stats",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        bar_data = await bar_data.json();
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bar_data.labels,
                datasets:bar_data.datasets,
                options: {
                    maintainAspectRatio:false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }
        });
       // console.log(myChart)
       // console.log(data)
    }
    catch(err){
        console.log(err);
    }
}