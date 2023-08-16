import { Button, Space, Menu } from "antd";

export default function Nav({ siteNames, chosen }) {
  const navChosen = ({ key }) => { chosen(key); }
  return (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['site-A']}
      items={siteNames.map(site => ({ key: site, label: site }))}
      onClick={navChosen}
    />
  )
}