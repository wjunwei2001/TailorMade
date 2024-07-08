# Tiktok Techjam 2024 - TailorMade

#### Team Members
- [Wang Junwei](https://github.com/wjunwei2001)
- [Jon Ang Ming](https://github.com/jon3r4de)
- [Kong Jun Rui](https://github.com/jr-kong)
- [Darren Tan Fanyi](https://github.com/darrentfy)
- [Stephen Li Cheng Xi](https://github.com/Sheeepen)

### _What product will you be recommended? It's a mystery! No one in the whole world knows, not even me!_

Made for _[Tiktok Techjam 2024](https://tiktoktechjam2024.devpost.com/) — Track 3_

To get started, refer to our [_Quickstart_](#quickstart) section.

## Table of Contents
- [Project Overview](#project-overview)
- [Quickstart Guide](#quickstart)
- [Technical Design Document](#technical-design-document)
- [Video Demo](#video-demo)

## Project Overview
We are team _It's a Mystery!_ bringing you our product: TailorMade!

_**TailorMade**_ is an AI+ML product recommender system that tailors to your preferences!  Looking for a present for a friend or family member? Need it delivered by the weekend? Fancy something unique? We combine all your preferences and circumstances to bring you tailor-made recommendations, just _for you_!

## Quickstart

1. Clone this repository into your desired directory.
```bash
git clone https://github.com/wjunwei2001/TailorMade.git
```

2. Open up a terminal, and run the following command to install dependencies for your Flask server from your root directory:
```bash
cd application/flaskapp
pip install -r requirements.txt
```

3. On the same terminal, start up the flask server using
```bash
python app.py
```

4. In a separate terminal, run the following command to install dependencies for your frontend server from your root directory:
```bash
cd application/client
npm i
```

5. On the same terminal, start up the React client using
```bash
npm start
```

6. In a separate terminal, run the following command to install dependencies for your backend server from your root directory:
```bash
cd application/server
npm i
```

7. On the same terminal, run the following command:
```bash
echo "PORT=8000" >> .env
echo "MONGO_URI=mongodb+srv://hackathon-user:<password>@cluster0.exvywqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" >> .env
```

8. On the same terminal, start up the backend server using
```bash
npm start
```

Input your desired preferences and explore away!

## Technical Design Document
For more information on the project, refer to our technical design document [here](https://docs.google.com/document/d/1vO-zpTbWxhTIsJxpjbtZOe_HTz5zxRwV9p_D8X-15kg/edit?usp=sharing).

## Video Demo
Feel free to look at how our product works through this demo! [here](https://youtu.be/IyTwNQMSzfY)
