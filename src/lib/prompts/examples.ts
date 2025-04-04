import { PromptExample } from './types';

/**
 * Example for risks review type - shows potential legal and business risks
 */
export const risksExample: PromptExample = {
  clause: `The Company shall use reasonable efforts to maintain the confidentiality of Client Data, but shall not be liable for any damages resulting from unauthorized access to Client Data unless such damages are a direct result of Company's gross negligence.`,
  
  analysis: `# Risk Analysis

## Legal Vulnerabilities
- The phrase "reasonable efforts" is vague and subjective, making it difficult to determine what level of security is actually required.
- "Gross negligence" sets a very high bar for liability, potentially leaving clients with no recourse for ordinary negligence.
- The clause lacks specificity about what security measures constitute "reasonable efforts."

## Business Exposure
- Clients with sensitive data may reject this clause as too favorable to the Company.
- The lack of clear security standards creates uncertainty about compliance requirements.
- The broad liability limitation could expose clients to significant uncompensated losses.

## Potential Loopholes
- The clause doesn't address liability for intentional misconduct by employees.
- There's no provision for notification of data breaches.
- The clause doesn't specify how "direct result" would be proven or determined.

## Enforcement Challenges
- Courts might find this provision unconscionable if the data involved is highly sensitive.
- The vague language around "reasonable efforts" makes enforcement inconsistent.
- Without defined security standards, it would be difficult to prove gross negligence.

## Risk Mitigation Recommendations
1. Replace "reasonable efforts" with specific security measures or compliance with defined standards.
2. Consider accepting liability for ordinary negligence with a reasonable cap.
3. Add breach notification requirements and response protocols.
4. Clarify what constitutes "Client Data" with a proper definition.
5. Include exceptions for intentional misconduct or willful violations.`
};

/**
 * Example for improvements review type - suggests ways to enhance the clause
 */
export const improvementsExample: PromptExample = {
  clause: `Termination: Either party may terminate this agreement with 30 days written notice to the other party.`,
  
  analysis: `# Improvement Analysis

## Current Strengths
- The clause is simple and easy to understand.
- It provides equal termination rights to both parties.
- It specifies a clear notice period (30 days).

## Language Improvements
- Specify the acceptable methods of "written notice" (email, certified mail, etc.).
- Clarify when the 30-day period begins (upon sending or receipt of notice).
- Define what constitutes proper delivery of the notice.

## Legal Enhancements
- Add provisions for termination with immediate effect in case of material breach.
- Include requirements for outstanding payments upon termination.
- Specify which obligations survive termination (confidentiality, etc.).

## Modern Best Practices
- Add a transition assistance provision requiring cooperation after termination.
- Include data return or destruction requirements.
- Specify dispute resolution processes for termination-related disagreements.

## Specific Revision
Recommended rewrite:

"Termination: Either party may terminate this Agreement by providing thirty (30) days' prior written notice to the other party, delivered via certified mail or email with confirmation of receipt. The notice period shall commence on the date of receipt. Upon termination: (i) Client shall pay all outstanding fees for services rendered; (ii) Company shall return or destroy all Client Data as instructed; and (iii) both parties shall cooperate on any transition activities for a period not to exceed sixty (60) days. Notwithstanding termination, the provisions related to confidentiality, intellectual property, and limitation of liability shall survive."`
};

/**
 * Example for completeness review type - identifies missing elements
 */
export const completenessExample: PromptExample = {
  clause: `Intellectual Property: All intellectual property created by Consultant during the project shall be owned by Client.`,
  
  analysis: `# Completeness Analysis

## Essential Components
- The clause addresses ownership of intellectual property (IP) created during the project.
- It establishes that IP created by the Consultant transfers to the Client.
- It makes a blanket statement about "all intellectual property" without exceptions.

## Definitions Analysis
- "Intellectual property" is not defined - should specify if it includes patents, copyrights, trademarks, trade secrets, etc.
- "Project" is not defined or referenced to a definition elsewhere in the agreement.
- No definition of what constitutes "created by Consultant" (e.g., solely created vs. jointly created).

## Scope Assessment
- The clause fails to address pre-existing intellectual property owned by the Consultant.
- No mention of third-party intellectual property that might be incorporated.
- Doesn't address intellectual property created after the project's completion.
- No process defined for identifying or documenting created intellectual property.

## Missing Elements
- No mention of the Consultant's license rights, if any, to use the created IP.
- No requirement for the Consultant to assist with IP registration or protection.
- No obligation for the Consultant to sign necessary documents to transfer ownership.
- No mention of moral rights waiver, which can be important in some jurisdictions.
- No discussion of compensation specifically for IP transfer.

## Integration Check
- This clause would need to work with definitions section of the contract.
- Should coordinate with confidentiality provisions regarding IP protection.
- May need to align with payment terms if IP transfer is tied to payment.
- Should connect to representations and warranties regarding originality of work.`
};

/**
 * Example for simplify review type - demonstrates plain language conversion
 */
export const simplifyExample: PromptExample = {
  clause: `Force Majeure: Neither party shall be deemed to be in breach of this Agreement or otherwise liable to the other party in any manner whatsoever for any failure or delay in performing its obligations under this Agreement due to Force Majeure. If either party's performance of its obligations under this Agreement is affected by Force Majeure, then it shall give written notice to the other party of the occurrence or existence of Force Majeure within seven (7) days of such occurrence and the obligations of the parties shall be suspended for the duration of the Force Majeure. For the purposes of this Agreement, "Force Majeure" means any event or circumstance which is beyond the reasonable control of the party affected by the event or circumstance including, without limitation, strikes, lockouts or other industrial disputes, acts of God, war, riot, civil commotion, malicious damage, disease or pandemic, compliance with any law or governmental order, accident, breakdown of plant or machinery, fire, flood, storm or default of suppliers or sub-contractors due to any of the foregoing events.`,
  
  analysis: `# Simplified Version

## Plain Language Version
"Force Majeure: Neither party is responsible for failing to perform their obligations due to events beyond their reasonable control. If such an event occurs, the affected party must notify the other party in writing within 7 days, and their obligations will be paused until the event ends. 'Force Majeure' includes events such as strikes, lockouts, natural disasters, war, riots, civil unrest, pandemics, compliance with government orders, accidents, equipment failures, fires, floods, and storms."

## Key Terms Preserved
- Force Majeure concept as excuse for non-performance
- 7-day notification requirement
- Suspension of obligations during the event
- Comprehensive list of qualifying events
- "Beyond reasonable control" standard

## Clarity Improvements
- Reduced sentence length from 74+ words to under 25 words per sentence
- Eliminated redundant phrases like "deemed to be" and "in any manner whatsoever"
- Replaced legalistic terms with plain language equivalents
- Used direct language instead of passive voice
- Simplified the list of covered events while maintaining scope

## Structure Optimization
- Organized content into three clear concepts:
  1. Basic rule (no liability for force majeure events)
  2. Notification process and effect
  3. Definition with examples
- Reduced word count by approximately 60% (175 words to 70)
- Maintained paragraph structure for readability
- Eliminated unnecessary repetition

## Legal Effectiveness
- Maintains the same legal standard of "beyond reasonable control"
- Preserves all categories of force majeure events
- Keeps the essential 7-day notice requirement
- Retains the suspension of obligations mechanism
- Maintains the same scope of protection for both parties`
};

/**
 * Example for ambiguities review type - highlights unclear elements
 */
export const ambiguitiesExample: PromptExample = {
  clause: `Payment Terms: Customer shall pay all invoices within a reasonable time of receipt. Late payments may be subject to a penalty at the Company's discretion.`,
  
  analysis: `# Ambiguity Analysis

## Identified Ambiguities
1. "Reasonable time" is completely undefined and subjective
2. No specification of what constitutes "receipt" of an invoice
3. "Late payments" has no defined threshold (when exactly is a payment considered late?)
4. "May be subject to a penalty" creates uncertainty about when penalties apply
5. "At the Company's discretion" provides no parameters for how this discretion is exercised

## Interpretation Risks
- "Reasonable time" could be interpreted anywhere from 7 to 90 days depending on industry and circumstances
- Without defining "receipt," disputes could arise about when the payment clock starts
- The Customer cannot predict or budget for potential penalties since both the trigger and amount are undefined
- The Company could potentially apply penalties inconsistently across customers
- A court might find the penalty provision unenforceable due to its vagueness

## Context Issues
- The clause lacks context about invoice delivery methods (electronic vs. physical mail)
- No mention of currency, payment methods, or banking information
- No reference to the underlying products/services being invoiced
- No indication of whether partial payments are acceptable
- Missing context about dispute resolution for contested invoices

## Definition Gaps
- "Reasonable time" needs a specific timeframe (e.g., "net 30 days")
- "Receipt" should specify whether it means delivery, opening, or processing of the invoice
- "Late payments" requires a clear threshold (e.g., "payments received after the due date")
- "Penalty" needs specification (e.g., "1.5% monthly interest on outstanding amounts")
- "Company's discretion" needs parameters or a standard for application

## Clarification Recommendations
Revised clause:
"Payment Terms: Customer shall pay all invoices within thirty (30) days of receipt. 'Receipt' means delivery to Customer's designated billing email or address. Any payment received after this thirty-day period shall be considered late and will incur a late fee of 1.5% of the outstanding amount per month, prorated daily. Customer may dispute any invoice in good faith by providing written notice detailing the basis of such dispute within fifteen (15) days of receipt, in which case the parties shall work in good faith to resolve such dispute promptly."`
}; 