import { Menu, Tooltip } from "antd";

export default function Nav({ siteNames, chosen, summaries = {} }) {
  const navChosen = ({ key }) => { chosen(key); }
  const capitalizeSiteName = name => {
    let nameDisplay = name.split('');
    nameDisplay[0] = nameDisplay[0].toUpperCase();
    return nameDisplay.join('');
  }
  const generateLabel = site => {
    const summary = summaries[site];
    const tipDisplay = (
      <div>
        days={summary?.days}<br />
        Avg weight={Math.floor(summary?.avgWeight || 0)}
      </div>
    )
    return <Tooltip title={tipDisplay}>{capitalizeSiteName(site)}</Tooltip>;
  }
  return (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['site-A']}
      items={siteNames.map(site => ({ key: site, label: generateLabel(site) }))}
      onClick={navChosen}
    />
  )
}