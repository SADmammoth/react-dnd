import React from "react";

export default function Card(props) {
  return (
    <div class="task-card hoverable completed center z-depth-2" {...props}>
      <div class="task-icon"></div>
      <div class="task-text">
        <div class="task-title">General Information</div>
        <div class="task-timing">Approx. 6 mins</div>
        <div class="task-info">
          <span class="task-required">required</span>|
          <span class="task-status">completed</span>
        </div>
      </div>
    </div>
  );
}
