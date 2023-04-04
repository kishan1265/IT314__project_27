// function to set the active dot
function Today() {
    const today = new Date();
    const day = today.toLocaleDateString('en-US', { weekday: 'long' });
    const month = today.toLocaleDateString('en-US', { month: 'long' });
    const date = today.getDate();
    const year = today.getFullYear();

    document.getElementById('date').innerHTML = `${day}, ${month} ${date}, ${year}`;
}
function check() {
    var currentImg = $('.slider-img .active');
    var imgNum = currentImg.index();
    var dotNum = $('.dot').eq(imgNum);
    dotNum.addClass('active').siblings().removeClass('active');

}


