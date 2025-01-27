/**
 * This file contains general css stylings
 */
import { css, Global } from '@emotion/react'
import React from "react";
import emotionNormalize from 'emotion-normalize';
import { checkFlexGapSupport } from './util/utilityFunctions';
import { useSelector } from 'react-redux';
import { selectTheme, Theme } from './redux/themeSlice';
import { createTheme } from '@mui/material/styles';

/**
 * An emotion component that inserts styles globally
 * Is removed when the styles change or when the Global component unmounts.
 */
export const GlobalStyle: React.FC = () => {
  const theme = useSelector(selectTheme);
  return (
    <Global styles={globalStyle(theme)} />
  );
}

/**
 * CSS for the global style component
 */
export const globalStyle = (theme: Theme) => css({
  emotionNormalize,
  body: {
    backgroundColor: `${theme.background}`,
    color: `${theme.text}`,
    fontSize: 'medium',
    // Makes the body span to the bottom of the page
    minHeight: "100vh",
  },
});


/**
 * CSS for replacing flexbox gap in browers that do not support it
 * Does not return a css prop, but is meant as a direct replacement for "gap"
 * Example: ...(flexGapReplacementStyle(30, false))
 */
export const flexGapReplacementStyle = (flexGapValue: number, flexDirectionIsRow: boolean) => {

  let half = flexGapValue / 2
  let quarter = flexGapValue / 4

  return (
    {
    // Use gap if supported
    ...(checkFlexGapSupport()) && {gap: `${flexGapValue}px`},
    // Else use margins
    ...(!checkFlexGapSupport()) &&
      {
        ">*": { // For each child
          marginTop: `${quarter}px`,
          marginBottom: `${quarter}px`,
          marginRight: `${half}px`,
          marginLeft: `${half}px`,
        },
        ...(flexDirectionIsRow) && {
          ">*:first-of-type": {
            marginLeft: '0px',
          },
          ">*:last-child": {
            marginRight: '0px',
          },
        },
      }
    }
  );
}

/**
 * CSS for buttons
 */
export const basicButtonStyle = (theme: Theme) => css({
  borderRadius: '10px',
  cursor: "pointer",
  // Animation
  transitionDuration: "0.3s",
  transitionProperty: "transform",
  "&:hover": {
    transform: 'scale(1.1)',
  },
  "&:focus": {
    transform: 'scale(1.1)',
  },
  "&:active": {
    transform: 'scale(0.9)',
  },
  // Flex position child elements
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...(flexGapReplacementStyle(10, false)),
  textAlign: 'center' as const,
  outline: `${theme.button_outline}`
});

/**
 * CSS for deactivated buttons
 */
export const deactivatedButtonStyle = css({
  borderRadius: '10px',
  cursor: "pointer",
  opacity: "0.4",
  // Flex position child elements
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...(flexGapReplacementStyle(10, false)),
  textAlign: 'center' as const,
});

/**
 * CSS for nagivation styled buttons
 */
export const navigationButtonStyle = (theme: Theme) => css({
  width: '200px',
  padding: '16px',
  justifyContent: 'space-around',
  boxShadow: `${theme.boxShadow}`,
  background: `${theme.element_bg}`,
 })

/**
 * CSS for a container that holds back/forward buttons
 */
export const backOrContinueStyle = css(({
  display: 'flex',
  flexDirection: 'row' as const,
  ...(flexGapReplacementStyle(20, false)),
}))

/**
 * CSS for big buttons in a dynamic grid
 */
 export const tileButtonStyle = (theme: Theme) => css({
  width: '250px',
  height: '220px',
  display: 'flex',
  flexDirection: 'column' as const,
  fontSize: "x-large",
  ...(flexGapReplacementStyle(30, false)),
  boxShadow: `${theme.boxShadow}`,
  background: `${theme.element_bg}`,
  alignItems: 'unset',  // overwrite from basicButtonStyle to allow for textOverflow to work
  placeSelf: 'center',
});

/**
 * CSS for disabling the animation of the basicButtonStyle
 */
export const disableButtonAnimation = css({
  "&:hover": {
    transform: 'none',
  },
  "&:focus": {
    transform: 'none',
  },
  "&:active": {
    transform: 'none',
  },
})

/**
 * CSS for a title
 */
export const titleStyle = css(({
  display: 'inline-block',
  padding: '15px',
  overflow: 'hidden',
  whiteSpace: "nowrap",
  textOverflow: 'ellipsis',
  maxWidth: '100%',
}))

/**
 * Addendum for the titleStyle
 * Used for page titles
 */
export const titleStyleBold = css({
  fontWeight: 'bold',
  fontSize: '24px',
  verticalAlign: '-2.5px',
})

/**
 * CSS for ariaLive regions that should not be visible
 */
export const ariaLive = css({
  position: 'absolute',
  left: '-99999px',
  height: '1px',
  width: '1px',
  overflow: 'hidden',
})

/**
 * CSS for displaying of errors
 */
export const errorBoxStyle = (errorStatus: boolean, theme: Theme) => {
  return (
    css({
      ...(!errorStatus) && {display: "none"},
      borderColor: `${theme.error}`,
      borderStyle: 'dashed',
      fontWeight: 'bold',
      padding: '10px',
    })
  );
}

export function selectFieldStyle(theme: Theme) {
  return {
    control: (provided: any) => ({
      ...provided,
      background: theme.element_bg,
    }),
    menu: (provided: any) => ({
      ...provided,
      background: theme.element_bg,
      outline: theme.dropdown_border,
      // kill the gap
      marginTop: 0,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: theme.text,
    }),
    multiValue: (provided: any) =>({
      ...provided,
      color: theme.selected_text,
      background: theme.multiValue,
      cursor: 'default',
    }),
    multiValueLabel: (provided: any) =>({
      ...provided,
      color: theme.selected_text,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isFocused ? theme.focused : theme.background
        && state.isSelected ? theme.selected : theme.background,
      ...(state.isFocused && {color: theme.focus_text}),
      color: state.isFocused ? theme.focus_text : theme.text
        && state.isSelected ? theme.selected_text : theme.text,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: theme.text,
    }),
    clearIndicator: (provided: any) => ({
      ...provided,
      color: theme.indicator_color,
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: theme.indicator_color,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      cursor: "text",
    }),
    input: (provided: any) => ({
      ...provided,
      color: theme.text,
    }),
  }
}

export const calendarStyle = (theme: Theme) => createTheme({

  components: {
    
    MuiPaper: {
      styleOverrides: {
        root: {
          /* Modal */
          outline: `${theme.dropdown_border} !important`,
          background: `${theme.background}`,
          color: `${theme.text}`,

          /* Calendar-modal */
          '.MuiYearPicker-root': {
            '.PrivatePickersYear-yearButton:hover, .Mui-selected:hover': {
              background: `${theme.focused}`,
              color: `${theme.focus_text}`,
            },
            '.Mui-selected': {
              background: `${theme.selected}`,
              color: `${theme.selected_text}`,
            }
          },
          
          /* Clock-modal */
          '& .MuiClock-clock': { // round clock
            background: `${theme.clock_bg}`,
            outline: `${theme.clock_border}`,
            '-webkitTextFillColor': `${theme.text}`, // Digits on the clock
            textShadow: `${theme.text_shadow}`
          },
          /* selected digit (hour/minute) */
          '& .MuiClockPicker-root .Mui-selected': {
            '-webkitTextFillColor': `${theme.digit_selected}`,
            fontWeight: 'bold',
            textShadow: 'none',
          },
          /* clock hands */
          '& .MuiClock-pin, .MuiClockPointer-root': {
            background: `${theme.clock_hands}`
          },
          '& .MuiClockPointer-thumb': {
            background: `${theme.clock_hands}`,
            border: `16px solid ${theme.clock_hands}`,
          }
        },
        
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          /* Calendar- and Clock-modal -> arrows, icon, days  */
          color: `${theme.icon_color} !important`,
          '&.MuiPickersDay-root': {
            background: 'transparent !important',
            color: `${theme.text} !important`,
          },
          '&:hover, &.Mui-selected:hover': {
            background: `${theme.focused} !important`,
            color: `${theme.focus_text} !important`,
          },
          // Selected day
          '&.Mui-selected': {
            background: `${theme.selected} !important`,
            color: `${theme.selected_text} !important`,
            
          },
          // Current day
          '&:not(.Mui-selected)': {
            borderColor: `${theme.focused} !important`,
          },
          '&.Mui-disabled':{
            color: `${theme.disabled} !important`,
          },
          '&.MuiClock-amButton, &.MuiClock-pmButton': {
            '-webkitTextFillColor': `${theme.text} !important`,
            '&:hover': {
              '-webkitTextFillColor': `${theme.clock_focus} !important`
            }
          },
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: { // Weekdays
          color: `${theme.disabled} !important`,
        },
      }
    },
  }  
})

export const subtitleSelectStyle = (theme: Theme) => createTheme({
  components: {
    /* Label: 'Pick a language' & 'Video Flavor' */
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: `${theme.text} !important`,
        },
      }
    },
    /* Labelborder */
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: `${theme.dropdown_border} !important`,
        },
      }
    },
    /* Selectfield/Inputfield with Icon */
    MuiSelect: {
      styleOverrides: {
        select: {
          background: `${theme.element_bg}`,
          color: `${theme.text} !important`,
        },
        icon: {
          color: `${theme.indicator_color}`,
        },
      }
    },

    /* Dropdownlist */
    MuiMenu: {
      styleOverrides: {
        list: {
          background: `${theme.background}`,
          color: `${theme.text}`,
          border: `${theme.dropdown_border}`,
        },
      }
    },
    /* Dropdownlist: Single entry */
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover, &.Mui-selected:hover': {
            color: `${theme.focus_text}`,
            background: `${theme.focused}`
          },
          '&.Mui-selected': {
            color: `${theme.selected_text}`,
            background: `${theme.selected}`,
          },
        },
      }
    }
  }
})
