import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();

  async function addMeetupHandler(meetupData) {
    // console.log(meetupData);

    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    // navigate away
    router.push("/"); // replace
  }

  const propsCreated = new Date().toLocaleString();
  const propsFunction = "no initial props";
  const propsType = "[Static]";

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name='description'
          content='Add your own meetups and create amazing networking opportunities!'
        />
      </Head>
      <p className='created'>
        created: <b suppressHydrationWarning={true}>{propsCreated}</b> :{" "}
        {propsFunction} <b>{propsType}</b>
      </p>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
