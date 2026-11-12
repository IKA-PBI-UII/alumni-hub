import type { Metadata } from "next";
import { PageHeader, SampleTag, Section } from "@/components/site/primitives";
import { EventCard } from "@/components/site/event-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pastEvents, upcomingEvents } from "@/data/events";
import { StorePromoCard } from "@/components/store/store-promo";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Talkshows, workshops and reunions."
        intro="Online and in Yogyakarta. RSVP so we can plan seats, snacks and Zoom links."
        image={{ src: "/images/event-conference.jpg", alt: "Audience at a conference" }}
      >
        <div className="mt-6">
          <SampleTag />
        </div>
      </PageHeader>
      <Section className="pt-10 md:pt-14">
        <Tabs defaultValue="upcoming" className="gap-6">
          <TabsList className="h-11 rounded-full bg-sand p-1">
            <TabsTrigger value="upcoming" className="rounded-full px-5">
              Upcoming ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="rounded-full px-5">
              Past ({pastEvents.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <ul className="space-y-4">
              {upcomingEvents.map((e) => (
                <li key={e.id}>
                  <EventCard event={e} />
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="past">
            <ul className="space-y-4">
              {pastEvents.map((e) => (
                <li key={e.id}>
                  <EventCard event={e} />
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
        <StorePromoCard
          className="mt-16"
          heading="Coming to an event? Wear the colours."
          line="Order online and pick it up at the venue. The varsity jacket drops for Reunion Night."
          featured={["varsity-jacket", "bucket-hat", "canvas-tote"]}
        />
      </Section>
    </>
  );
}
