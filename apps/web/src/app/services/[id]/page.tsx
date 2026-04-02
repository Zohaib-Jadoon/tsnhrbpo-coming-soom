import React from "react"
import { notFound } from "next/navigation"
import { HR_CHAPTERS } from "../../../data/services"
import ServiceDetail from "../../../components/ServiceDetail"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"

interface PageProps {
    params: Promise<{ id: string }>
}

export async function generateStaticParams() {
    return HR_CHAPTERS.map((chapter) => ({
        id: chapter.id,
    }))
}

export default async function ServicePage({ params }: PageProps) {
    const { id } = await params
    const service = HR_CHAPTERS.find((c) => c.id === id)

    if (!service) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-[#020617]">
            <Navbar />
            <ServiceDetail service={service} />
            <Footer />
        </main>
    )
}
