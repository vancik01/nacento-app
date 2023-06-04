import * as React from "react"

const JsonOffer = ({ color }) => {
  if (!color) color = "#0B6DFF";

  return(
    <svg
    width={30}
    height={30}
    viewBox="0 0 464 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.073 99.185c0-69.6 51.334-83 77-81h188l132.5 123.5v365c0 54-39.333 72.833-59 75.5-65.333-.167-210.599-.4-269 0-58.4.4-70.666-46.5-69.5-70v-413Z"
      fill="#fff"
      stroke={color}
      strokeWidth={35}
      strokeLinecap="round"
    />
    <path
      d="M271.5 18.5v95c.167 12.5 8.4 37.7 40 38.5 31.6.8 82.5.333 104 0"
      stroke={color}
      strokeWidth={35}
      strokeLinecap="round"
    />
    <path
      d="M110.072 276.844v59.78c0 8.296-2.399 14.762-7.198 19.398-4.799 4.555-11.224 6.832-19.276 6.832-8.133 0-14.721-2.359-19.764-7.076-4.961-4.717-7.442-11.305-7.442-19.764h17.08c.081 3.66.935 6.507 2.562 8.54 1.708 2.033 4.148 3.05 7.32 3.05 3.09 0 5.45-.976 7.076-2.928 1.627-1.952 2.44-4.636 2.44-8.052v-59.78h17.202Zm49.326 86.01c-5.937 0-11.305-1.017-16.104-3.05-4.717-2.033-8.459-4.961-11.224-8.784-2.765-3.823-4.189-8.337-4.27-13.542h18.3c.244 3.497 1.464 6.263 3.66 8.296 2.277 2.033 5.368 3.05 9.272 3.05 3.985 0 7.117-.935 9.394-2.806 2.277-1.952 3.416-4.473 3.416-7.564 0-2.521-.773-4.595-2.318-6.222-1.545-1.627-3.497-2.887-5.856-3.782-2.277-.976-5.449-2.033-9.516-3.172-5.531-1.627-10.045-3.213-13.542-4.758-3.416-1.627-6.385-4.026-8.906-7.198-2.44-3.253-3.66-7.564-3.66-12.932 0-5.043 1.261-9.435 3.782-13.176 2.521-3.741 6.059-6.588 10.614-8.54 4.555-2.033 9.76-3.05 15.616-3.05 8.784 0 15.901 2.155 21.35 6.466 5.531 4.229 8.581 10.167 9.15 17.812h-18.788c-.163-2.928-1.423-5.327-3.782-7.198-2.277-1.952-5.327-2.928-9.15-2.928-3.335 0-6.019.854-8.052 2.562-1.952 1.708-2.928 4.189-2.928 7.442 0 2.277.732 4.189 2.196 5.734 1.545 1.464 3.416 2.684 5.612 3.66 2.277.895 5.449 1.952 9.516 3.172 5.531 1.627 10.045 3.253 13.542 4.88 3.497 1.627 6.507 4.067 9.028 7.32 2.521 3.253 3.782 7.523 3.782 12.81 0 4.555-1.179 8.784-3.538 12.688s-5.815 7.035-10.37 9.394c-4.555 2.277-9.963 3.416-16.226 3.416Zm84.47 0c-7.971 0-15.291-1.871-21.96-5.612-6.669-3.741-11.956-8.906-15.86-15.494-3.904-6.669-5.856-14.193-5.856-22.57 0-8.296 1.952-15.738 5.856-22.326 3.904-6.669 9.191-11.875 15.86-15.616 6.669-3.741 13.989-5.612 21.96-5.612 8.052 0 15.372 1.871 21.96 5.612 6.669 3.741 11.915 8.947 15.738 15.616 3.904 6.588 5.856 14.03 5.856 22.326 0 8.377-1.952 15.901-5.856 22.57-3.823 6.588-9.069 11.753-15.738 15.494-6.669 3.741-13.989 5.612-21.96 5.612Zm0-15.25c5.124 0 9.638-1.139 13.542-3.416 3.904-2.359 6.954-5.693 9.15-10.004 2.196-4.311 3.294-9.313 3.294-15.006s-1.098-10.655-3.294-14.884c-2.196-4.311-5.246-7.605-9.15-9.882-3.904-2.277-8.418-3.416-13.542-3.416-5.124 0-9.679 1.139-13.664 3.416-3.904 2.277-6.954 5.571-9.15 9.882-2.196 4.229-3.294 9.191-3.294 14.884s1.098 10.695 3.294 15.006c2.196 4.311 5.246 7.645 9.15 10.004 3.985 2.277 8.54 3.416 13.664 3.416ZM372.963 362h-17.08l-38.674-58.438V362h-17.08v-85.278h17.08l38.674 58.56v-58.56h17.08V362Z"
      fill={color}
    />
  </svg>
)}

export default JsonOffer