import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { API_SOCIAL_PROFILES } from "../constants.jsx";
import { fetchToken } from "../fetchToken.jsx";
import Loading from "../../../components/common/Loading.jsx";
import Profile from "./profile/Profile.jsx";
import Banner from "./profile/Banner.jsx";
import Followers from "./profile/Followers.jsx";
import Following from "./profile/Following.jsx";

function GetProfile() {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  let navigate = useNavigate();

  const { name } = useParams();

  if (!name) {
    navigate.push("/");
  }

  const baseUrl = API_SOCIAL_PROFILES + name;
  const posts = "?_posts=true";
  const url = baseUrl + posts;

  useEffect(() => {
    async function fetchData() {
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetchToken(url);
        const json = await response.json();
        setProfile(json);
        console.log(json);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <>
      <Container>
        <Breadcrumb className="breadcrumb pt-4 pb-2">
          <Breadcrumb.Item href="/profiles">Profiles</Breadcrumb.Item>
          <Breadcrumb.Item active>{profile.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="justify-content-between">
          <Banner profile={profile} />
          <Col md="3" className="pt-3">
            <Profile profile={profile} />
          </Col>
          <Col md="6" className="pt-3">
            posts
          </Col>
          <Col md="3" className="pt-3">
            <Followers profile={profile} />
            <Following profile={profile} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GetProfile;
