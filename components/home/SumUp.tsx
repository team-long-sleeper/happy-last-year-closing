import MyEpisodesHeader from './MyEpsiodesHeader';
import DotsLoader from '@components/common/loading/DotsLoader';
import TopContent from './TopContents';
import useGetStaticsQuery from '@/query/statics/useGetStatics.query';

export default function SumUp() {
  const { data: statics } = useGetStaticsQuery({});

  return (
    <div>
      <div className="pt-15 pb-25">
        {statics ? (
          <div className="relative">
            {/* <div className="pl-5 pb-8 flex gap-2 items-center">
              <Icon icon={TuneIcon} iconColor="default" />
              <FilteringOptions />
            </div> */}

            <MyEpisodesHeader count={statics.summary.totalEpisodes} />
            <div className="grid grid-cols-3 gap-4 px-5 pt-5.5">
              <div className="border border-primary px-4 flex flex-col gap-2 py-3">
                <span>친구</span>
                <span>{statics.summary.uniqueContacts} </span>
              </div>
              <div className="border border-primary px-4 flex flex-col gap-2 py-3">
                <span>장소</span>
                <span>{statics.summary.uniquePlaces} </span>
              </div>
              <div className="border border-primary px-4 flex flex-col gap-2 py-3">
                <span>월 평균</span>
                <span>{statics.summary.monthlyAverage} </span>
              </div>
            </div>

            <div className="pl-5 pt-7.5">
              <div className="flex overflow-x-scroll overflow-y-hidden gap-2 pr-10">
                {statics.topContacts.map((item, index) => (
                  <TopContent
                    key={item.contact.id}
                    count={item.episodeCount}
                    img={item.contact.profileImage}
                    title={item.contact.name}
                    type="MATE"
                    ranking={index + 1}
                  />
                ))}
              </div>
            </div>

            <div className="pl-5 pt-7.5">
              <div className="flex overflow-x-scroll overflow-y-hidden gap-2 pr-10">
                {statics.topPlaces.map((item, index) => (
                  <TopContent
                    key={item.place.id}
                    count={item.episodeCount}
                    img={item.place.thumbnailUrl}
                    title={item.place.name}
                    type="PLACE"
                    ranking={index + 1}
                  />
                ))}
              </div>
            </div>

            <div className="pl-5 pt-7.5">
              <div className="flex overflow-x-scroll overflow-y-hidden gap-2 pr-10">
                {statics.topTags.map((item, index) => (
                  <TopContent
                    key={item.tag.id}
                    count={item.episodeCount}
                    img={item.thumbnailUrl}
                    title={item.tag.label}
                    type="TAG"
                    ranking={index + 1}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-1/2 ">
            <DotsLoader />
          </div>
        )}
      </div>
    </div>
  );
}
