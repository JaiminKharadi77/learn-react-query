"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";

const ProfileTabs = () => {
  const pathname = usePathname();

  // Extract the last segment of the pathname
  const pathSegments = pathname.split("/");
  const tab = pathSegments[pathSegments.length - 1];

  // Ensure tab is only "followers" or "following"
  if (tab !== "followers" && tab !== "following") {
    return (
      <div className="container mt-4 text-center">
        <h1 className="text-danger">404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link href="/user/following">
          <button className="btn btn-primary">Go to Following</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Tab.Container activeKey={tab}>
        <Nav variant="tabs">
          <Nav.Item>
            <Link href="/user/followers" passHref legacyBehavior>
              <Nav.Link eventKey="followers">Followers</Nav.Link>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href="/user/following" passHref legacyBehavior>
              <Nav.Link eventKey="following">Following</Nav.Link>
            </Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-3">
          <Tab.Pane eventKey="followers">
            <h3>Followers List</h3>
            {/* Add followers content here */}
          </Tab.Pane>
          <Tab.Pane eventKey="following">
            <h3>Following List</h3>
            {/* Add following content here */}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default ProfileTabs;
