import { styled } from "styled-components";
import Nav from "../atoms/Nav";
import { Link } from "react-router-dom";

const Container = styled.nav`
  width: 1200px;
  margin: 0 auto;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const staticServerUri = process.env.REACT_APP_PATH || "";

const NavBar = () => {
  return (
    <Container>
      <Link to={`${staticServerUri}/`}>
        <img
          src={`${staticServerUri}/../../../assets/logoKakao.png`}
          alt="카카오 쇼핑하기"
          width={120}
        />
      </Link>
      <Nav />
    </Container>
  );
};

export default NavBar;
