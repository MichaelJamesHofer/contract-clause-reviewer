import { PromptTemplate } from './types';
import { 
  risksExample, 
  improvementsExample, 
  completenessExample, 
  simplifyExample, 
  ambiguitiesExample 
} from './examples';

/**
 * Optimized prompt templates for each review type and provider
 */
export const promptTemplates: PromptTemplate[] = [
  {
    type: 'RISKS',
    template: {
      openai: `Please analyze this contract clause for potential legal and business risks:

Contract Clause:
"""
{{clause}}
"""

Your analysis should include:

1. Legal Vulnerabilities: Identify specific legal weaknesses or exposures.
2. Business Risks: Evaluate potential business consequences and liabilities.
3. Potential Loopholes: Highlight any gaps that could be exploited.
4. Enforcement Challenges: Discuss potential difficulties in enforcing the clause.
5. Risk Mitigation: Recommend concrete changes to address the identified risks.

Format your response with clear headings and bullet points for each section.`,
      
      claude: `Please conduct a thorough risk analysis of the following contract clause, focusing on legal and business risks:

Contract Clause:
"""
{{clause}}
"""

Please structure your analysis with the following sections:
1. Legal Vulnerabilities: Identify potential legal weaknesses or challenges
2. Business Exposure: Analyze potential business risks and liabilities
3. Potential Loopholes: Highlight gaps that could be exploited
4. Enforcement Challenges: Discuss potential difficulties in enforcing the clause
5. Risk Mitigation Recommendations: Suggest specific changes to address identified risks

For each section, provide bullet points of specific issues, explaining why each presents a risk and its potential impact.`,
      
      perplexity: `Analyze the following contract clause for potential legal and business risks:

"""
{{clause}}
"""

Your analysis must cover:

LEGAL VULNERABILITIES
- Identify specific legal weaknesses
- Note potential regulatory issues
- Highlight liability exposures

BUSINESS RISKS
- Assess potential financial implications
- Evaluate operational impacts
- Consider relationship/reputational concerns

POTENTIAL LOOPHOLES
- Identify exploitable gaps
- Assess potential misinterpretations
- Note undefined terms or conditions

ENFORCEMENT ISSUES
- Identify challenges to enforcement
- Assess evidentiary difficulties
- Note jurisdictional concerns

RISK MITIGATION
- Provide specific wording changes
- Suggest additional protections
- Recommend structural improvements

Present your analysis in a clear, structured format with bulleted lists under each heading.`
    },
    examples: [risksExample]
  },
  
  {
    type: 'IMPROVEMENTS',
    template: {
      openai: `Please analyze and suggest improvements for the following contract clause:

Contract Clause:
"""
{{clause}}
"""

Your analysis should include:

1. Current Strengths: Identify what works well in the current language.
2. Language Improvements: Suggest clearer, more precise wording.
3. Legal Enhancements: Recommend additions to strengthen legal protection.
4. Modern Best Practices: Suggest updates based on current standards.
5. Specific Revision: Provide a concrete rewrite of the entire clause.

Format your response with clear headings and bullet points for each section.`,
      
      claude: `Please analyze and suggest improvements for the following contract clause:

Contract Clause:
"""
{{clause}}
"""

Please structure your response with the following sections:
1. Current Strengths: Identify what works well in the current clause
2. Language Improvements: Suggest clearer or more precise wording
3. Legal Enhancements: Recommend additions to strengthen legal protection
4. Modern Best Practices: Suggest updates based on current industry standards
5. Specific Revisions: Provide concrete rewording suggestions

For each improvement, explain the rationale and potential benefit. Conclude with a complete rewrite of the clause incorporating all recommended improvements.`,
      
      perplexity: `Analyze the following contract clause and suggest improvements:

"""
{{clause}}
"""

Your analysis must include:

CURRENT STRENGTHS
- Identify effective elements
- Note clear language
- Highlight protective aspects

LANGUAGE IMPROVEMENTS
- Suggest clearer wording
- Identify ambiguous terms
- Recommend structural changes

LEGAL ENHANCEMENTS
- Suggest additional protections
- Identify missing legal elements
- Recommend liability safeguards

MODERN BEST PRACTICES
- Suggest industry-standard updates
- Recommend digital-age considerations
- Note regulatory compliance updates

REVISED CLAUSE
[Provide a complete rewrite incorporating all improvements]

Present your analysis in a clear, structured format with bullet points under each heading, followed by a complete revised version of the clause.`
    },
    examples: [improvementsExample]
  },
  
  {
    type: 'COMPLETENESS',
    template: {
      openai: `Please evaluate the completeness of the following contract clause:

Contract Clause:
"""
{{clause}}
"""

Your analysis should include:

1. Essential Components: Check for all necessary clause elements.
2. Definitions Analysis: Identify terms requiring definition.
3. Scope Assessment: Evaluate coverage of relevant scenarios.
4. Missing Elements: List any omitted but important components.
5. Integration Check: Analyze relationship with other standard clauses.

Format your response with clear headings and bullet points for each section.`,
      
      claude: `Please evaluate the completeness of the following contract clause:

Contract Clause:
"""
{{clause}}
"""

Please structure your analysis with the following sections:
1. Essential Components: Check for all necessary clause elements
2. Definitions Analysis: Identify terms requiring definition
3. Scope Assessment: Evaluate coverage of relevant scenarios
4. Missing Elements: List any omitted but important components
5. Integration Check: Analyze relationship with other standard clauses

For each section, provide specific observations about what is present and what is missing, explaining why any missing elements are important and how they should be addressed.`,
      
      perplexity: `Evaluate the completeness of the following contract clause:

"""
{{clause}}
"""

Your analysis must cover:

ESSENTIAL COMPONENTS
- Identify core elements present
- Note standard components missing
- Assess structural completeness

DEFINITIONS NEEDED
- List undefined key terms
- Identify ambiguous language
- Note terms requiring more precision

SCOPE COVERAGE
- Evaluate scenario coverage
- Identify potential gaps
- Assess boundary conditions

MISSING ELEMENTS
- List critical omissions
- Recommend additional provisions
- Provide rationale for additions

INTEGRATION WITH OTHER CLAUSES
- Note dependencies on other clauses
- Identify potential conflicts
- Suggest coordination improvements

Present your analysis in a clear, structured format with bullet points under each heading.`
    },
    examples: [completenessExample]
  },
  
  {
    type: 'SIMPLIFICATION',
    template: {
      openai: `Please simplify the following contract clause while maintaining its legal effectiveness:

Contract Clause:
"""
{{clause}}
"""

Your response should include:

1. Plain Language Version: Provide a simplified rewrite.
2. Key Terms Preserved: List important legal terms maintained.
3. Clarity Improvements: Explain how understanding is enhanced.
4. Structure Optimization: Show how organization is streamlined.
5. Legal Effectiveness: Confirm maintained legal protections.

Format your response with clear headings and ensure the simplified version is substantially shorter and clearer while preserving all legal protections.`,
      
      claude: `Please simplify the following contract clause while maintaining its legal effectiveness:

Contract Clause:
"""
{{clause}}
"""

Please structure your response with the following sections:
1. Plain Language Version: Provide a simplified rewrite
2. Key Terms Preserved: List important legal terms maintained
3. Clarity Improvements: Explain how understanding is enhanced
4. Structure Optimization: Show how organization is streamlined
5. Legal Effectiveness: Confirm maintained legal protections

Focus on reducing complexity, eliminating redundancy, and using plain language while preserving all the legal protections and obligations in the original clause.`,
      
      perplexity: `Simplify the following contract clause while maintaining its legal effectiveness:

"""
{{clause}}
"""

Your response must include:

SIMPLIFIED VERSION
[Provide a plain language rewrite here]

KEY TERMS PRESERVED
- List essential legal terms retained
- Note critical concepts maintained
- Identify preserved protections

CLARITY IMPROVEMENTS
- Note sentence structure changes
- Highlight eliminated jargon
- Explain readability enhancements

STRUCTURAL OPTIMIZATION
- Describe organizational improvements
- Note length reduction metrics
- Explain logical flow enhancements

LEGAL EQUIVALENCE
- Confirm all rights maintained
- Verify obligations preserved
- Ensure enforceability intact

Present your analysis with the simplified version first, followed by explanatory sections with bullet points.`
    },
    examples: [simplifyExample]
  },
  
  {
    type: 'AMBIGUITIES',
    template: {
      openai: `Please identify and analyze ambiguities in the following contract clause:

Contract Clause:
"""
{{clause}}
"""

Your analysis should include:

1. Identified Ambiguities: List unclear or vague terms.
2. Interpretation Risks: Discuss potential misinterpretations.
3. Context Issues: Analyze contextual clarity problems.
4. Definition Gaps: Identify undefined but important terms.
5. Clarification Recommendations: Suggest specific improvements.

Format your response with clear headings and bullet points for each section.`,
      
      claude: `Please identify and analyze ambiguities in the following contract clause:

Contract Clause:
"""
{{clause}}
"""

Please structure your analysis with the following sections:
1. Identified Ambiguities: List unclear or vague terms
2. Interpretation Risks: Discuss potential misinterpretations
3. Context Issues: Analyze contextual clarity problems
4. Definition Gaps: Identify undefined but important terms
5. Clarification Recommendations: Suggest specific improvements

For each ambiguity, explain why it creates uncertainty, what different interpretations could arise, and how it could lead to potential disputes. Conclude with a redrafted version that resolves all identified ambiguities.`,
      
      perplexity: `Identify and analyze ambiguities in the following contract clause:

"""
{{clause}}
"""

Your analysis must cover:

IDENTIFIED AMBIGUITIES
- List each unclear term or phrase
- Note vague language
- Identify unclear references

INTERPRETATION RISKS
- Explain possible misinterpretations
- Assess potential conflicts
- Note enforcement challenges

CONTEXTUAL ISSUES
- Identify missing context
- Note assumed knowledge
- Highlight situational ambiguities

DEFINITION GAPS
- List undefined key terms
- Identify imprecise standards
- Note subjective measurements

CLARIFICATION RECOMMENDATIONS
- Provide specific rewording suggestions
- Recommend additional definitions
- Suggest structural improvements

Present your analysis in a clear, structured format with bullet points under each heading, followed by a revised version that resolves the ambiguities.`
    },
    examples: [ambiguitiesExample]
  }
]; 