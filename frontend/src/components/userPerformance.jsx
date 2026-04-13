export function UserPerformance ({strategy, role}) {
  return (
    <tr> 
      <td>{strategy.key_perf}</td>
      <td>{strategy.succes_indic}</td>
      { role !== 'IPCR' ?
        <>
          <td>{strategy.alloted_budget}</td>
          <td>{strategy.division_individuals_accountable}</td>
        </> : ""
      }
      <td>{strategy.actual_accomp}</td>
      <td style={{paddingTop: 25, paddingBottom: 25}}>{strategy.quality}</td>
      <td>{strategy.efficiency}</td>
      <td>{strategy.timeliness}</td>
      <td style={{backgroundColor: "rgb(248, 248, 248)"}}>{strategy.avg_per_form}</td>
      <td style={{textAlign: "center"}}>{strategy.remarks}</td>
    </tr>
  )
}
