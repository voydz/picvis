import Paper from '@material-ui/core/Paper'
import MuiTabs from '@material-ui/core/Tabs'
import MuiTab from '@material-ui/core/Tab'

export function Tabs({value, onChange}) {
  return (
    <Paper>
      <MuiTabs value={value} onChange={onChange}>
        <MuiTab label="Ausstehend" />
        <MuiTab label="Angenommen" />
        {/* <MuiTab label="Abgelehnt" /> */}
      </MuiTabs>
    </Paper>
  );
}
