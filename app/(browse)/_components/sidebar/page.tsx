import {Wrapper} from './wrapper';
import {Toggle, ToggleSkeleton} from './toggle';
import {Recommended, RecommendedSkeleton} from './recommended';
import { getRecommended } from '@/lib/recommended-service';
import exp from 'constants';
import { getFollowedUsers } from '@/lib/follow-service';
import { Following } from './following';

export const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();



  return (

  <Wrapper>
    <Toggle />
    <div className='space-y-4 pt-4 lg:pt-0'>
      <Following data={following} />
      <Recommended data={recommended} />
    </div>
  </Wrapper>
  
)};


export const SidebarSkeleton = () => {
  return (
    <aside className='fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-border z-50'>
     <ToggleSkeleton /> 
     <RecommendedSkeleton />
      
    </aside>
  )
}
