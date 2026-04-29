const firstHourTardiesFilePicker = document.getElementById("firstHourTardiesFilePicker");

function showError(msg) {
    const box = document.getElementById("errorBox");
    box.style.display = "block";
    box.innerText = msg;
}

function clearError() { document.getElementById("errorBox").style.display = "none"; }

function downloadCSV(csvString, filename = "data.csv") {
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // Clean up
}

document.getElementById("tardiesCalculateResults").addEventListener("click", () => {
    // user wants report generated
    clearError();

    const selectedFile = firstHourTardiesFilePicker.files[0];

    if (selectedFile === undefined) {
        showError("You didn't pick a file");
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const fileData = event.target.result;

        if (!fileData.includes("Total Tardies")) {
            showError("This doesn't look like the first hour tardies file, did you select the right report?");
            return;
        }

        const splitByLine = fileData.replaceAll("\r\n", "\n").split("\n");

        // remove headers
        //splitByLine.shift();
        //splitByLine.shift();
        splitByLine.shift();

        // filter by selected semester
        let filteredBySemester = [];

        // I alloc a new array here to reduce the chance that I'll make a mistake
        // when trying to delete items while iterating over the array.
        for (const entry of splitByLine) {
            if (entry.split(",")[6] == document.getElementById("semesterSelect").value) {
                filteredBySemester.push(entry);
            }
        }

        let finalResultsCSV = [
            "Student ID,Last Name,First Name,# of tardies,Result"
        ];

        for (const entry of filteredBySemester) {
            const entrySplit = entry.split(",");

            const studentId = entrySplit[0];
            const lastName  = entrySplit[1];
            const firstName = entrySplit[2];
            const tardies   = parseInt(entrySplit[8]);

            let fate = null;

            // determine student fate...
            if (tardies >= 16) {
                fate = "Half-day suspension";
            } else if (tardies >= 8) {
                fate = "Before/after school detention";
            } else if (tardies >= 5) {
                fate = "Lunch detention"
            }

            if (fate !== null) {
                finalResultsCSV.push(`${studentId},${lastName},${firstName},${tardies},${fate}`);
            }
        }
        downloadCSV(
            finalResultsCSV.join("\n"),
            "First Hour Tardy Results.csv"
        );
    });
    reader.readAsText(selectedFile);


});


// TRUANT PERIODS

document.getElementById("truantsCalculateResults").addEventListener("click", () => {
    // user wants report generated
    clearError();

    const selectedFile = document.getElementById("truantFilePicker").files[0];

    if (selectedFile === undefined) {
        showError("You didn't pick a file");
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const fileData = event.target.result;

        if (!fileData.includes("function.SumofTruantABS")) {
            showError("This doesn't look like the truancy report file, did you select the right report?");
            return;
        }

        const splitByLine = fileData.replaceAll("\r\n", "\n").split("\n");

        // remove headers
        splitByLine.shift();

        // filter by selected semester
        let filteredBySemester = [];

        // I alloc a new array here to reduce the chance that I'll make a mistake
        // when trying to delete items while iterating over the array.
        for (const entry of splitByLine) {
            if (entry.split(",")[6] == document.getElementById("semesterSelect").value) {
                filteredBySemester.push(entry);
            }
        }

        let finalResultsCSV = [
            "Student ID,Last Name,First Name,Result"
        ];

        for (const entry of filteredBySemester) {
            const entrySplit = entry.split(",");

            const studentId = entrySplit[0];
            const lastName  = entrySplit[1];
            const firstName = entrySplit[2];
            const truancy   = parseInt(entrySplit[7] / 4);

            let fate = null;

            // determine student fate...
            if (truancy >= 321) {
                fate = "Habitual Truancy Letter 3(7)";
            } else if (truancy >= 281) {
                fate = "Habitual Truancy Letter 3(6)";
            } else if (truancy >= 241) {
                fate = "Habitual Truancy Letter 3(5)";
            } else if (truancy >= 201) {
                fate = "Habitual Truancy Letter 3(4)";
            } else if (truancy >= 161) {
                fate = "Habitual Truancy Letter 3(3)";
            } else if (truancy >= 121) {
                fate = "Habitual Truancy Letter 3(2)";
            } else if (truancy >= 81) {
                fate = "Habitual Truancy Letter 3(1)";
            } else if (truancy >= 41) {
                fate = "Habitual Truancy Letter 2";
            } else if (truancy >= 20) {
                fate = "Habitual Truancy Letter 1";
            }

            if (fate !== null) {
                finalResultsCSV.push(`${studentId},${lastName},${firstName},${fate}`);
            }
        }
        downloadCSV(
            finalResultsCSV.join("\n"),
            "Truancy Letter Results.csv"
        );
    });
    reader.readAsText(selectedFile);

});









document.getElementById("acceptableUsesCalculateResults").addEventListener("click", () => {
    // user wants report generated
    clearError();

    const selectedFile = document.getElementById("acceptableUsesFilePicker").files[0];

    if (selectedFile === undefined) {
        showError("You didn't pick a file");
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        const fileData = event.target.result;

        if (!fileData.includes("function.SumExcused")) {
            showError("This doesn't look like the right file, did you select the correct report?");
            return;
        }

        const splitByLine = fileData.replaceAll("\r\n", "\n").split("\n");

        // remove headers
        splitByLine.shift();

        // filter by selected semester
        let filteredBySemester = [];

        // I alloc a new array here to reduce the chance that I'll make a mistake
        // when trying to delete items while iterating over the array.
        for (const entry of splitByLine) {
            if (entry.split(",")[6] == document.getElementById("semesterSelect").value) {
                filteredBySemester.push(entry);
            }
        }

        let finalResultsCSV = [
            "Student ID,Last Name,First Name,Result"
        ];

        for (const entry of filteredBySemester) {
            const entrySplit = entry.split(",");

            const studentId = entrySplit[0];
            const lastName  = entrySplit[1];
            const firstName = entrySplit[2];
            const target   = parseInt(entrySplit[7]) / 4;

            let fate = null;

            // determine student fate...
            if (target >= 10) {
                fate = "Acceptable Excuses Limit Letter";
            }

            if (fate !== null) {
                finalResultsCSV.push(`${studentId},${lastName},${firstName},${fate}`);
            }
        }
        downloadCSV(
            finalResultsCSV.join("\n"),
            "Acceptable Excuses Limit Results.csv"
        );
    });
    reader.readAsText(selectedFile);

});
