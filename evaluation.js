function startTest() {

    // Step 1: Get roles
    fetch("http://localhost:8000/role")
    .then(res => res.json())
    .then(data => {

        let role = prompt("Who are you?\n" + data.roles.join("\n"));

        // Step 2: Get questions
        fetch("http://localhost:8000/questions?role=" + role)
        .then(res => res.json())
        .then(qdata => {

            let answers = [];

            qdata.q.forEach(q => {
                let ans = prompt(q);
                answers.push(ans);
            });

            // Step 3: Send answers
            fetch("http://localhost:8000/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "role=" + role + "&answers=" + answers.join(",")
            })
            .then(res => res.json())
            .then(result => {

                let output = "🧠 Role: " + result.role + "<br><br>";

                output += "📅 Schedule:<br>";
                for (let key in result.schedule) {
                    output += key + ": " + result.schedule[key] + "<br>";
                }

                output += "<br>🔔 Reminders:<br>";
                result.reminders.forEach(r => {
                    output += r + "<br>";
                });

                document.getElementById("output").innerHTML = output;
            });

        });

    });
}