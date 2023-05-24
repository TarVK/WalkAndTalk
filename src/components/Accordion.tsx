import {FC, useState} from "react";
import { IAccordionItem } from "./_types/IAccordionItem";
import {Accordion as MUIAccordion, AccordionSummary, Typography, AccordionDetails} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const Accordion: FC<{items: IAccordionItem[]}> = ({items})=>{
    const [expanded, setExpanded] = useState(-1);
    return <>{items.map((item, i)=><MUIAccordion key={i} expanded={expanded === i} onChange={()=>expanded===i?setExpanded(-1):setExpanded(i)}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
      id="panel1bh-header"
    >
        {item.title}
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        {item.text}
      </Typography>
    </AccordionDetails>
  </MUIAccordion>)}</>;
}