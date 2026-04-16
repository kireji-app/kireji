Q(".issue-row.header>[data-order]").removeAttribute("data-order")
Q(`.issue-row.header>.issue-${match.arm.key}`).setAttribute("data-order", "")