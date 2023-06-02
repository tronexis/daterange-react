import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface Props {
  label?: {
    start: string;
    end: string;
  };
  onChange?: (startDate: string | null, endDate: string | null) => void;
  format?: string;
  value?: (string | null)[];
}

const DateRangePicker: React.FC<Props> = ({
  label,
  onChange,
  format,
  value,
}) => {
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const startDateRef = useRef(null);

  useEffect(() => {
    onChange?.(
      startDate?.format(format ?? "MM/DD/YYYY") ?? null,
      endDate?.format(format ?? "MM/DD/YYYY") ?? null
    );
  }, [startDate, endDate, onChange, format]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          position: "relative",
        }}
      >
        <DatePicker
          ref={startDateRef}
          label={label?.start ?? "Start"}
          defaultValue={(value?.[0] && dayjs(value?.[0])) ?? startDate}
          onChange={(date) => {
            if (date) setStartDate(date);
          }}
          onAccept={() => {
            setShowStart(false);
            setShowEnd(true);
          }}
          onOpen={() => setShowStart(true)}
          onClose={() => setShowStart(false)}
          open={showStart}
          disableHighlightToday
          format={format}
        />
        <p>{"–"}</p>
        <DatePicker
          defaultValue={(value?.[1] && dayjs(value?.[1])) ?? endDate}
          label={label?.end ?? "End"}
          onChange={(date) => {
            if (date) setEndDate(date);
            setShowEnd(false);
          }}
          onOpen={() => setShowEnd(true)}
          onClose={() => setShowEnd(false)}
          open={showEnd}
          disableHighlightToday
          disabled={!startDate}
          minDate={startDate ? startDate.add(1, "day") : undefined}
          format={format}
        />
        {/* <DateField label="Start" onClick={() => setShow(true)} />
        <DateField label="End" onClick={() => setShow(true)} />
        {show && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              position: "absolute",
              top: 50,
              left: -1 / 2,
            }}
          >
            <DateCalendar
              disableHighlightToday
              // slots={{
              //   day: <PickersDay />,
              // }}
            />
            <DateCalendar
              disableHighlightToday
              defaultValue={dayjs().month(dayjs().month() + 1)}
            />
          </Box> */}
        {/* )} */}
        {/* <DatePickerToolbar
          onViewChange={(view: TView) => {
            null;
            view;
          }}
          view="day"
        /> */}
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
