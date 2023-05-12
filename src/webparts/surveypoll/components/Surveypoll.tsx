import { getSP } from "./pnpconfig";
import { SPFI } from "@pnp/sp";
import "@pnp/sp/profiles";
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { ICamlQuery } from "@pnp/sp/lists";
// import { IOpinionPollProps } from './IOpinionPollProps';
import * as React from "react";
import { ISurveypollProps } from "./ISurveypollProps";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/site-users";
// import { IClientsidePage } from "@pnp/sp/clientside-pages";
// you need to import the comments sub-module or use the all preset
import "@pnp/sp/comments/clientside-page";
import "@pnp/sp/webs";
// import styles from './Surveypoll.module.scss';
import { getGUID } from "@pnp/core";
import PollElement from "./PollElement";

const OpinionPoll = async (props: ISurveypollProps) => {
  const caml: ICamlQuery = {
    ViewXml:
      "<View><Query><FieldRef Name='ID' /><FieldRef Name='Questions' /></Query></View>",
  };

  let arr: any[] = [];
  const [data, setData] = React.useState<any>();
  const [userEmail, setUserEmail] = React.useState("");

  const _sp: SPFI = getSP(props.context);

  // our page instance
// const page: IClientsidePage = await _sp.web.loadClientsidePage("/sites/dev/sitepages/home.aspx");

// // turn on comments
// await page.enableComments();

// // turn off comments
// await page.disableComments();

  const updateItem = async () => {
    try {
      const id: number = 1;
      console.log(id);
      if (id > 0) {
        const itemUpdate = await _sp.web.lists
          .getByTitle("OpinionPoll")
          .items.getById(id)
          .update({
            Title: getGUID(),
            PeopleId: [6],
          });
        console.log(itemUpdate);
        alert(`Item with ID: ${id} updated successfully!`);
      } else {
        alert(`Please enter a valid item id.`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async () => {
    const _sp: SPFI = getSP(props.context);
    const list = await _sp.web.lists.getByTitle("OpinionPoll");
    console.log(list);
    const r = await list.getItemsByCAMLQuery(caml);
    console.log(r);
    arr = r;
    setData(arr);
    console.log(arr);
    r.map((x: any) => {
      console.log(x.Title);
      const arr = x.Choices;
      arr.map((i: any) => {
        console.log(i);
      });
    });
  };
  const handleButtonClick = async () => {
    try {
      const currentUser = await _sp.web.currentUser();
      const emails = await currentUser.Email;
      const uid = await currentUser.Id;
      //setuserId(uid)
      console.log(uid);
      //console.log(userId);
      const userEm = emails;
      setUserEmail(userEm);
      await getData();
      console.log(userEmail);
    } catch (error) {
      console.log("Error getting user email:", error);
    }
  };
  console.log(handleButtonClick);
  React.useEffect(() => {
    getData().catch((e) => {
      console.log(e);
    });
  }, []);

  return (
    <div>
      {data &&
        data.map((x: any) => {
          return (
            <p>
              {x.Questions}
              {x.Choices.map((y: any) => {
                return <p>{y}</p>;
              })}
            </p>
          );
        })}
      {/* <div>
        <button onClick={handleButtonClick}>Vote</button>
        <p>User Email: {userEmail}</p>
      </div> */}
      <div>
        <button onClick={() => updateItem()}>Vote</button>
      </div>
      <PollElement pollelemet ={arr}/>
      
    </div>
  );
};
export default OpinionPoll;
