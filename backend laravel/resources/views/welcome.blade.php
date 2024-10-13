<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backend</title>
    <style scoped>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        * * {
            font-weight: normal;
        }

        img {
            object-fit: cover;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: radial-gradient(circle at 10% 20%, rgb(221, 49, 49) 0%, rgb(119, 0, 0) 90%);
            color: white;
        }

        .page {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            height: 100vh;
            padding: 2rem;
        }

        img.backend {
            width: 40%;
        }

        h1 {
            font-size: 2rem;
            margin-top: 1rem;
            font-weight: bold;
        }

        h5 {
            font-size: 1rem;
            margin-top: 0.1rem;
            font-weight: semi-bold;
        }

        .copyright>p {
            font-size: 0.5rem;
        }

        .button {
            display: inline-block;
            padding: 0.3rem 1.5rem;
            margin-top: 1rem;
            /* red but lighter */
            background: #ff3636;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            color: white;
            text-decoration: none;
            border-radius: 3px;
            transition: all 0.3s;
            cursor: pointer;
            /* style the button */
            /* darker border */
            font-size: 0.8rem;
        }


        .button>* {
            font-weight: bold;
        }

        button {
            all: unset;
        }

        .button:hover {
            background: transparent;
            box-shadow: 0 0 0px rgba(0, 0, 0, 0.1);
            color: #ecf0f1;
        }

        a {
            color: inherit;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="page">
        <div class="content logo">
            <h1>Backend</h1>
            <button class="button">
                <a href="http://localhost:4000">App</a>
            </button>
        </div>

        <div class="copyright">
            <p>Copyright © <?= date("Y"); ?> Ikatek </p>
        </div>
    </div>
</body>

</html>
