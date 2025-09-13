<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Potato Project</title>
    <style>
        /* --- Reset & Base --- */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Arial', sans-serif;
        }
        body {
            background-color: #fff8e7;
            color: #333;
        }
        a {
            text-decoration: none;
            color: inherit;
        }

        /* --- Navbar --- */
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background-color: #f2c94c;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .logo {
            font-size: 1.8rem;
            font-weight: bold;
            color: #fff;
        }
        ul {
            display: flex;
            list-style: none;
        }
        ul li {
            margin-left: 1.5rem;
        }
        ul li a {
            font-weight: bold;
            color: #fff;
            transition: 0.3s;
        }
        ul li a:hover {
            text-decoration: underline;
        }

        /* --- Hero Section --- */
        .hero {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 6rem 2rem;
            background: url('https://images.unsplash.com/photo-1582515073490-d99a83efb4b0?auto=format&fit=crop&w=1350&q=80') no-repeat center center/cover;
            color: #fff;
        }
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
        }
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        }
        .hero button {
            padding: 0.8rem 2rem;
            font-size: 1rem;
            background-color: #fff;
            color: #f2c94c;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            transition: 0.3s;
        }
        .hero button:hover {
            background-color: #ffe066;
        }

        /* --- Features Section --- */
        .features {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            padding: 4rem 2rem;
        }
        .card {
            background-color: #fff3d6;
            border-radius: 15px;
            padding: 2rem;
            width: 250px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: 0.3s;
            cursor: pointer;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }
        .card h3 {
            margin-bottom: 1rem;
            color: #f2994a;
        }
        .card p {
            font-size: 0.9rem;
        }

        /* --- Footer --- */
        footer {
            text-align: center;
            padding: 2rem;
            background-color: #f2c94c;
            color: #fff;
            font-weight: bold;
        }

        /* --- Responsive --- */
        @media(max-width:768px){
            .features {
                flex-direction: column;
                align-items: center;
            }
            .hero h1 {
                font-size: 2.2rem;
            }
            .hero p {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>

    <!-- Navbar -->
    <nav>
        <div class="logo">Potato Project</div>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#potatoOrNot">Potato or Not</a></li>
            <li><a href="#diseaseDetector">Disease Detector</a></li>
            <li><a href="#priceDetector">Price Detector</a></li>
            <li><a href="#about">About</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <h1>Welcome to the Potato Project 🌱</h1>
        <p>Your one-stop solution for potato detection, disease analysis, and price estimation.</p>
        <button onclick="scrollToFeatures()">Explore Features</button>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
        <div class="card" onclick="location.href='potatoOrNot.html'">
            <h3>Potato or Not</h3>
            <p>Upload an image and find out if it's a potato or not using our ML model.</p>
        </div>
        <div class="card" onclick="location.href='diseaseDetector.html'">
            <h3>Disease Detector</h3>
            <p>Identify potato diseases and get tips for prevention and treatment.</p>
        </div>
        <div class="card" onclick="location.href='priceDetector.html'">
            <h3>Price Detector</h3>
            <p>Estimate potato prices based on weight, type, and location.</p>
        </div>
        <div class="card" onclick="location.href='#about'">
            <h3>About</h3>
            <p>Learn more about the project, the creator, and some fun potato facts!</p>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" style="padding:4rem 2rem; text-align:center;">
        <h2>About the Project</h2>
        <p>This project is designed to help farmers, enthusiasts, and anyone interested in potatoes by providing easy-to-use tools for detection, disease analysis, and price estimation. Built with love and science! 🥔❤️</p>
    </section>

    <!-- Footer -->
    <footer>
        &copy; 2025 Potato Project | Made with 💛 by You
    </footer>

    <!-- JS -->
    <script>
        function scrollToFeatures(){
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
        }
    </script>

</body>
</html>
