import { useState, useEffect } from "react";
import Nav from "./nav"
import DataTable from "./dataTable"
import { getSites } from "./dal";
import { Layout } from 'antd';

const { Content } = Layout;

export default function Sites() {
  const [allSites, setAllSites] = useState({});
  const [siteNames, setSiteNames] = useState([]);
  const [siteSummaries, setSiteSummaries] = useState({});
  const [siteChosen, setSiteChosen] = useState(siteNames[0]);
  const [dataSet, setDataSet] = useState(allSites[siteChosen]);
  const chosen = siteName => setSiteChosen(siteName);

  useEffect(() => { setDataSet(allSites[siteChosen]?.days) }, [siteChosen]);

  useEffect(() => {
    const sitesRequester = async () => {
      const allSitesResponse = await getSites();
      setSiteChosen(Object.keys(allSitesResponse)[0]);
      return setAllSites(allSitesResponse);
    }
    sitesRequester();
  }, []);

  useEffect(() => {
    setSiteNames(Object.keys(allSites));
    const newSummaries = {};
    for (let site in allSites) {
      newSummaries[site] = allSites[site].summary;
    }
    setSiteSummaries(newSummaries);
  }, [allSites]);

  return (
    <Layout>
      <Nav siteNames={siteNames} chosen={chosen} summaries={siteSummaries} />
      <Content>
        <DataTable dataSet={dataSet} />
      </Content>
    </Layout>
  )
}