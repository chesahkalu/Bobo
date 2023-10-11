# milestones/utils.py

def generate_progress_report(logged_milestones, age_in_months):
    """
    Generates a progress report for a baby based on logged milestones and age.
    
    Parameters:
    - logged_milestones (QuerySet): A collection of milestones that have been logged for the baby.
    - age_in_months (int): The baby's age in months.

    Returns:
    - report (str): A formatted string representing the progress report.
    """
    
    # Extracting the description of each milestone into a list
    milestone_list = [milestone.description for milestone in logged_milestones]
    
    # Initializing the report with a header indicating the baby's age
    report = f"At {age_in_months} months, the baby has achieved the following milestones: \n"
    
    # Appending each milestone to the report
    for milestone in milestone_list:
        report += f"- {milestone} \n"
    
    # In case there are no milestones logged for the baby for this month, provide a default message
    if not milestone_list:
        report += "No milestones have been logged for this month yet. Please log your current baby's achieved milestones to get a summary of her progress."
    
    return report
