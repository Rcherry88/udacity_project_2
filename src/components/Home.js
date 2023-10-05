import React, { useState } from "react";
import { connect } from "react-redux";
import NavigationBar from "./NavigationBar";
import Poll from "./Poll";
import { Tabs, Tab, Typography, Box } from "@material-ui/core";
import PropTypes from "prop-types";

const Home = (homeProps) => {
  const [tab, setTab] = useState(1);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };



  function tabProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <NavigationBar />
      <Tabs
        value={tab}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab label="Answered" {...tabProps(0)} />
        <Tab label="Unanswered" {...tabProps(1)} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        {homeProps.props.answeredQuestions.map((q) => (
          <Poll key={q.id} ques={q} />
        ))}
      </TabPanel>
      <TabPanel value={tab} index={1}>
        {homeProps.props.unansweredQuestions.map((q) => (
          <Poll key={q.id} ques={q} />
        ))}
      </TabPanel>
    </div>
  );
};

function stateManagement({ users, questions, authedUser }) {
  let allQuestions = Object.values(questions);
  let loggedInUser = users[authedUser];
  let loggedInAnswers = loggedInUser ? Object.keys(loggedInUser.answers) : [];
  const answeredQuestions = allQuestions
    .filter((question) => loggedInAnswers.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unansweredQuestions = allQuestions
    .filter((question) => !loggedInAnswers.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  return (
    <Home
      answeredQuestions={answeredQuestions}
      unansweredQuestions={unansweredQuestions}
    />
  );
}

export default connect(stateManagement)(Home);
