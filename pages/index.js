import Head from "next/head";
import { MongoClient } from "mongodb"; // ONLY ON THE SERVER : USED IN 'getStaticProps()'
import { Fragment, useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  // // [REACT] STANDARD FETCH DATA : useEffect + useState
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   // send a http request and fetch data [async]
  //   // set state
  //   setLoadedMeetups(DUMMY_DATA);
  //   console.log("useEffect");
  // }, []); // ON INITIAL RENDER

  return (
    <Fragment>
      {/* <MeetupList meetups={DUMMY_DATA} /> */}
      {/* <MeetupList meetups={loadedMeetups} /> */}
      <Head>
        <title>NextJS Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <p className='created'>
        created: <b>{props.created}</b> : {props.function} <b>{props.type}</b>
      </p>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// [SSG]
export async function getStaticProps() {
  // fetch data from API : connect file system, database, ... (SAFE FOR CREDENTIALS)
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.gmwjq.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString, {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const meetupsCollection = db.collection("meetups"); // collection = table
  const meetups = await meetupsCollection.find().toArray(); // array of documents = rows
  // console.log(meetups);
  client.close();

  return {
    props: {
      // meetups: DUMMY_DATA,
      // meetups: meetups, // Error serializing `_id`
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(), // JS Object to String
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        // description: meetup.description,
      })),
      created: new Date().toLocaleString(),
      type: "[SSG]",
      function: "getStaticProps() + revalidate",
    },
    revalidate: 10, // 10 seconds
  };
}

// // [SSR]
// export async function getServerSideProps(context) {
//   // fetch data from API : connect file system, database, ... (SAFE FOR CREDENTIALS)
//   // console.log(context); // WE CAN WORK WIT CONTEXT (REQUEST, RESPONSE)
//   const req = context.req;
//   const res = context.res;
//   const body = req.body; // BODY FOR POST, PUT, PATCH, ...
//   const cookie = req.headers.cookie; // SESSION COOKIE [FOR AUTHENTICATION]
//   // [cookie]
//   //   next-auth.csrf-token
//   //   next-auth.callback-url
//   //   next-auth.session-token
//   // console.log({ cookie: cookie });

//   return {
//     props: {
//       meetups: DUMMY_DATA,
//       created: new Date().toLocaleString(),
//       type: "[SSR]",
//       function: "getServerSideProps()",
//     },
//   };
// }

export default HomePage;

const DUMMY_DATA = [
  {
    id: "m1",
    title: "This is a first meetup",
    image:
      "https://images.pexels.com/photos/2598010/pexels-photo-2598010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
  {
    id: "m2",
    title: "This is a second meetup",
    image:
      "https://images.pexels.com/photos/2734406/pexels-photo-2734406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a second, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
  {
    id: "m3",
    title: "This is a third meetup",
    image:
      "https://images.pexels.com/photos/815880/pexels-photo-815880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a third, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
];
