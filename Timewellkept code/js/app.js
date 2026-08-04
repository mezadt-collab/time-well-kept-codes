document.addEventListener("DOMContentLoaded", async () => {

    console.log("Time Well Kept Started");

    await TimeWellKept.loadDatabase();

    await renderTimeline();
    await renderCollection();

});