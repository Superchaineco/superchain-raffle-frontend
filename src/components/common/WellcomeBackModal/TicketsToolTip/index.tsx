import Typography from "@mui/material/Typography";
import { Stack, SvgIcon } from "@mui/material";
import TicketsIcon from "@/public/images/tickets-icon-blue.svg";

type Props = {
  winningTickets: {
    raffleName: string;
    tickets: string[];
  }[];
};

function WellcomeBackModalTicketsToolTip({ winningTickets }: Props) {
  return (
    <Stack p={1} spacing={2} direction={"column"}>
      <Stack
        direction={"column"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={1}
      >
        {winningTickets.map((data, index) => (
          <>
            <Typography variant="body2">{data.raffleName}</Typography>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={2}
            >
              {data.tickets.map((ticket, index) => (
                <Stack
                  key={index}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  spacing={0.5}
                >
                  <SvgIcon
                    component={TicketsIcon}
                    inheritViewBox
                    style={{ width: "20px", height: "20px" }}
                  />
                  <Typography variant="body2">{ticket}</Typography>
                </Stack>
              ))}
            </Stack>
          </>
        ))}
      </Stack>
    </Stack>
  );
}

export default WellcomeBackModalTicketsToolTip;
