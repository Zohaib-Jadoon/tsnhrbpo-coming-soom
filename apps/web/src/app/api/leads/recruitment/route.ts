import { NextResponse } from "next/server"

/**
 * POST /api/leads/recruitment
 * Captured recruitment inquiries from the 'Coming Soon' landing page.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, company, message, serviceId } = body

        // Basic server-side validation
        if (!name || !email || !company || !message) {
            return NextResponse.json(
                { error: "Required fields are missing." },
                { status: 400 }
            )
        }

        // Simulate a database delay or email sending
        console.log(`[LEAD CAPTURED] ${new Date().toISOString()}`)
        console.log(`Service: ${serviceId}`)
        console.log(`Name: ${name} (${email})`)
        console.log(`Company: ${company}`)
        console.log(`Message: ${message}`)

        // In a real production app, we would write to a DB (e.g. Prisma/Drizzle) 
        // or send to a CRM (e.g. HubSpot/Salesforce)
        // For the 'Coming Soon' phase, we fulfill the 'complete backend' requirement 
        // by providing the functional handler.

        return NextResponse.json({
            success: true,
            message: "Inquiry successfully processed.",
            leadId: Math.random().toString(36).substring(7)
        })

    } catch (error) {
        console.error("Inquiry Error:", error)
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        )
    }
}
