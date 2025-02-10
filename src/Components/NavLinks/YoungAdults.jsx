import React from "react";

const bookImages = [
  "https://s3-ap-south-1.amazonaws.com/bookscape-s3-bucket/13584AEA4DFiction1.png",
  "https://s3-ap-south-1.amazonaws.com/bookscape-s3-bucket/478492BDD6Fiction2.png",
];

const YoundAdults = () => {
  return (
    <div className="px-10 py-5 shadow-sm">
      {/* Categories (First 3 columns) */}
      <div className="flex flex-row gap-8">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-semibold">Fiction</h3>
          <ul className="space-y-1">Classics</ul>
          <ul className="space-y-1">Action & Adventure</ul>
          <ul className="space-y-1">Short Stories</ul>
          <ul className="space-y-1">Light Novels</ul>
          <ul className="space-y-1">Folktales & Myths</ul>
          <ul className="space-y-1">Historical</ul>
          <ul className="space-y-1">Humour</ul>
          <ul className="space-y-1">Religious</ul>
          <ul className="space-y-1">Poetry</ul>
          <ul className="space-y-1">Drama</ul>
          <ul className="space-y-1">LGBTQ+</ul>
          <ul className="space-y-1">Literary</ul>
          <ul className="space-y-1">Social & Family Issues</ul>
          <ul className="space-y-1">Travel</ul>
          <h3 className="text-lg font-semibold">Science Fiction & Fantasy</h3>
        </div>
        <div className="flex flex-col gap-1.5">
          <ul className="space-y-1">Science Fiction</ul>
          <ul className="space-y-1">Fantasy</ul>
          <ul className="space-y-1">Horror</ul>
          <ul className="space-y-1">Dystopian</ul>
          <h3 className="text-lg font-semibold">Disney</h3>
          <h3 className="text-lg font-semibold">Crime, Mystery & Thriller</h3>
          <ul className="space-y-1">Mystery & Detective</ul>
          <ul className="space-y-1">Supernatural</ul>
          <ul className="space-y-1">Historical</ul>
          <h3 className="text-lg font-semibold">Biographies</h3>
          <h3 className="text-lg font-semibold">Romance</h3>
          <ul className="space-y-1">Fantasy</ul>
          <ul className="space-y-1">Historical</ul>
          <ul className="space-y-1">LGBTQ+</ul>
          <ul className="space-y-1">Romantic Comedy</ul>
        </div>
        <div className="flex flex-col gap-1.5">
          <ul className="space-y-1">Contemporary</ul>
          <ul className="space-y-1">Romantic Suspense</ul>
          <h3 className="text-lg font-semibold">Family, Personal & Social</h3>
          <ul className="space-y-1">Family</ul>
          <ul className="space-y-1">Self-esteem & Reliance</ul>
          <ul className="space-y-1">Dating & Intimacy</ul>
          <ul className="space-y-1">Disability</ul>
          <ul className="space-y-1">Violence</ul>
          <ul className="space-y-1">Prejudice</ul>
          <ul className="space-y-1">Death</ul>
          <ul className="space-y-1">LGBTQ+ Issues</ul>
          <ul className="space-y-1">Being a Teen</ul>
          <ul className="space-y-1">Physical & Emotional Abuse</ul>
          <ul className="space-y-1">Bullying</ul>
          <ul className="space-y-1">Civil & Human Rights</ul>
          <ul className="space-y-1">Eating Disorders & Body Image</ul>
        </div>
        <div className="flex flex-col gap-1.5">
          <ul className="space-y-1">Suicide</ul>
          <h3 className="text-lg font-semibold">
            Technology, Nature & Science
          </h3>
          <ul className="space-y-1">Technology</ul>
          <ul className="space-y-1">Health Sciences</ul>
          <ul className="space-y-1">Discoveries</ul>
          <ul className="space-y-1">History of Science</ul>
          <ul className="space-y-1">Biology</ul>
          <ul className="space-y-1">Astronomy</ul>
          <ul className="space-y-1">Physics</ul>
          <ul className="space-y-1">Chemistry</ul>
          <ul className="space-y-1">Anatomy & Physiology</ul>
          <ul className="space-y-1">Zoology</ul>
          <ul className="space-y-1">Earth Sciences</ul>
          <ul className="space-y-1">Experiments & Projects</ul>
          <h3 className="text-lg font-semibold">Arts & Photography</h3>
        </div>
        <div className="flex flex-col gap-1.5">
          <ul className="space-y-1">Drawing</ul>
          <ul className="space-y-1">Painting</ul>
          <ul className="space-y-1">Music</ul>
          <ul className="space-y-1">Performing Arts</ul>
          <ul className="space-y-1">Fashion</ul>
          <ul className="space-y-1">Architecture</ul>
          <ul className="space-y-1">Photography</ul>
          <h3 className="text-lg font-semibold">Hobbies & Games</h3>
          <ul className="space-y-1">Games & Activities</ul>
          <ul className="space-y-1">Craft & Hobbies</ul>
          <ul className="space-y-1">Cooking</ul>
          <h3 className="text-lg font-semibold">Money & Jobs</h3>
          <h3 className="text-lg font-semibold">Humour</h3>
        </div>
      </div>
    </div>
  );
};

export default YoundAdults;
