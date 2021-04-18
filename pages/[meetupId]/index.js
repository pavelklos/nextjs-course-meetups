import { MongoClient, ObjectId } from "mongodb"; // ONLY ON THE SERVER : USED IN 'getStaticProps()'
import { useRouter } from "next/router";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  const router = useRouter();
  const meetupId = router.query?.meetupId;

  return (
    <Fragment>
      <p className='created'>
        created: <b>{props.created}</b> : {props.function} <b>{props.type}</b>
      </p>
      <MeetupDetail
        // image='https://images.pexels.com/photos/2598010/pexels-photo-2598010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        // title='This is a first meetup'
        // address='Meetupstreet 5, 12345 Meetup City'
        // description='This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!'
        // id='m1'
        // image={props.meetup.image}
        // title={props.meetup.title}
        // address={props.meetup.address}
        // description={props.meetup.description}
        // id={props.meetup.id}
        image={props.meetup.image}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description}
        id={props.meetup.id}
      />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  // console.log(context); // WE CAN WORK WIT CONTEXT (PARAMS)
  const params = context.params;
  const meetupId = params.meetupId;
  // console.log(params);

  // fetch data for single item from API
  // connect file system, database, ... (SAFE FOR CREDENTIALS)
  // fetch data from API : connect file system, database, ... (SAFE FOR CREDENTIALS)
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.gmwjq.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString, {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const meetupsCollection = db.collection("meetups"); // collection = table
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  // one document = row
  // console.log("selectedMeetup", selectedMeetup);
  client.close();

  return {
    props: {
      // meetup: {
      //   image:
      //     "https://images.pexels.com/photos/2598010/pexels-photo-2598010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      //   title: "This is a first meetup",
      //   address: "Meetupstreet 5, 12345 Meetup City",
      //   description:
      //     "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
      //   // id: "m1",
      //   id: meetupId,
      // },
      // meetup: selectedMeetup,
      // meetup: { ...selectedMeetup, _id: selectedMeetup._id.toString() },
      meetup: {
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        id: selectedMeetup._id.toString(),
      },
      created: new Date().toLocaleString(),
      type: "[DYNAMIC SSG]",
      function: "getStaticProps() + getStaticPaths()", // + revalidate
    },
  };
}

export async function getStaticPaths() {
  // fetch data from API : connect file system, database, ... (SAFE FOR CREDENTIALS)
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.gmwjq.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString, {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const meetupsCollection = db.collection("meetups"); // collection = table
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  // array of documents = rows
  // {} = no filter, { _id: 1 } fetching only document with field '_id'
  // console.log(meetups);
  client.close();
  // generate paths dynamically
  const paths = meetups.map((meetup) => ({
    params: { meetupId: meetup._id.toString() },
  }));

  return {
    // paths: [
    //   { params: { meetupId: "m1" } },
    //   { params: { meetupId: "m2" } },
    //   { params: { meetupId: "m3" } },
    // ],
    paths: paths,
    fallback: false, // false, true, 'blocking'
  };
}

export default MeetupDetails;
